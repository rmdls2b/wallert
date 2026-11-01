// Duress protection: any action that weakens monitoring (disabling or deleting a
// wallet, an alert channel or the account) is delayed, and the trusted circle is
// notified immediately. Monitoring stays fully active during the delay, so a user
// forced to "turn off the alarm" before a transfer still triggers alerts.

import { Resend } from "resend"
import { escapeHtml, createRateLimiter } from "./security"

const resend = new Resend(process.env.RESEND_API_KEY)
const APP_URL = process.env.APP_URL || "https://wallert.app"

const hours = (value, fallback) => {
  const n = Number(value)
  return (Number.isFinite(n) && n > 0 ? n : fallback) * 60 * 60 * 1000
}

export const PROTECTION_DELAY_MS = hours(process.env.PROTECTION_DELAY_HOURS, 24)
export const ACCOUNT_DELETION_DELAY_MS = hours(process.env.ACCOUNT_DELETION_DELAY_HOURS, 72)

// Bound the number of notices a single user can trigger (request/cancel loops).
const noticeLimiter = createRateLimiter(10, 60 * 60 * 1000)

// A channel that cannot deliver anything can be removed without delay.
export function channelDelivers(channel) {
  if (!channel.isActive) return false
  if (channel.type === "email") return channel.verified
  if (channel.type === "telegram") return !!channel.value
  return false
}

export async function removeAddressFromAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: process.env.ALCHEMY_WEBHOOK_ID, addresses_to_add: [], addresses_to_remove: [address] }),
  })
}

async function sendTelegram(chatId, text) {
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  })
}

// Notify the account owner and every channel currently able to deliver.
// `change` is a plain-text description, e.g. "Monitoring of wallet 0x12…ab will be disabled".
export async function notifyProtectionChange(userId, prisma, change, effectiveAt) {
  if (!noticeLimiter.check(userId)) {
    console.log("Protection notice limit reached for user:", userId)
    return
  }
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { channels: true } })
  if (!user) return

  const who = user.pseudonym ? escapeHtml(user.pseudonym) : "a Wallert user who listed you as a trusted contact"
  const when = effectiveAt.toISOString().replace("T", " ").slice(0, 16) + " UTC"
  const safeChange = escapeHtml(change)
  const from = "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">"
  const subject = "Wallert: protection settings changed" + (user.pseudonym ? " for " + escapeHtml(user.pseudonym) : "")
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#f59e0b;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">Protection change requested</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 16px 0;">A change was requested on the Wallert protection of ${who}:</p><p style="color:#333;font-size:14px;font-weight:bold;line-height:1.6;margin:0 0 16px 0;">${safeChange}</p><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 16px 0;">It takes effect on <strong>${when}</strong>. Until then, monitoring stays fully active.</p><p style="color:#cc0000;font-size:13px;line-height:1.6;margin:0;">If this change is unexpected, check in with them through a channel you trust.</p></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;"><a href="${APP_URL}" style="color:#ccc;">Wallert</a></p></div></div>`
  const telegramText = `⚠️ <b>Wallert: protection change requested</b>\n\nFor ${who}:\n<b>${safeChange}</b>\n\nTakes effect on ${when}. Monitoring stays active until then.\nIf this is unexpected, check in with them through a channel you trust.`

  const emails = [user.email, ...user.channels.filter(c => c.type === "email" && channelDelivers(c)).map(c => c.value)]
  for (const to of emails) {
    try {
      const { error } = await resend.emails.send({ from, to, subject, html })
      if (error) console.error("Protection notice email failed:", to, error.message)
    } catch (err) { console.error("Protection notice email failed:", to, err.message) }
  }
  for (const c of user.channels.filter(c => c.type === "telegram" && channelDelivers(c))) {
    try { await sendTelegram(c.value, telegramText) }
    catch (err) { console.error("Protection notice Telegram failed:", err.message) }
  }
}

export function shortAddress(address) {
  return address.slice(0, 8) + "…" + address.slice(-6)
}

// Called from the cron: apply the delayed actions whose delay has elapsed.
export async function applyDuePendingActions(prisma) {
  const cutoff = new Date(Date.now() - PROTECTION_DELAY_MS)

  const dueAddresses = await prisma.watchedAddress.findMany({
    where: { pendingAction: { not: null }, pendingActionAt: { lt: cutoff } },
  })
  for (const addr of dueAddresses) {
    if (addr.pendingAction === "delete") {
      await prisma.alert.deleteMany({ where: { addressId: addr.id } })
      await prisma.watchedAddress.delete({ where: { id: addr.id } })
    } else {
      await prisma.watchedAddress.update({
        where: { id: addr.id },
        data: { isActive: false, pendingAction: null, pendingActionAt: null },
      })
    }
    const remaining = await prisma.watchedAddress.count({ where: { address: addr.address, isActive: true } })
    if (remaining === 0) {
      try { await removeAddressFromAlchemy(addr.address) } catch {}
    }
  }

  const dueChannels = await prisma.alertChannel.findMany({
    where: { pendingAction: { not: null }, pendingActionAt: { lt: cutoff } },
  })
  for (const channel of dueChannels) {
    if (channel.pendingAction === "delete") {
      await prisma.alertChannel.delete({ where: { id: channel.id } })
    } else {
      await prisma.alertChannel.update({
        where: { id: channel.id },
        data: { isActive: false, pendingAction: null, pendingActionAt: null },
      })
    }
  }

  return { addresses: dueAddresses.length, channels: dueChannels.length }
}
