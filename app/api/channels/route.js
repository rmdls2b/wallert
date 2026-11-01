import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getUserFromRequest } from "../../lib/security"
import { PROTECTION_DELAY_MS, notifyProtectionChange, channelDelivers } from "../../lib/protection"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)
const APP_URL = process.env.APP_URL || "https://wallert.app"

export async function POST(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { type, value, label } = await request.json()

    if (type === "email") {
      const emailCount = await prisma.alertChannel.count({ where: { userId, type: "email" } })
      if (emailCount >= 1) return NextResponse.json({ error: "Beta limit: 1 additional email maximum. Self-host for unlimited." }, { status: 400 })
    }

    if (type === "telegram") {
      const tgCount = await prisma.alertChannel.count({ where: { userId, type: "telegram" } })
      if (tgCount >= 1) return NextResponse.json({ error: "Beta limit: 1 Telegram group maximum. Self-host for unlimited." }, { status: 400 })
    }

// Verify Telegram group access before creating channel
    if (type === "telegram" && value) {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: value, text: "✅ Wallert Bot linked to this group. Emergency alerts will be sent here.", parse_mode: "HTML" }),
        })
        const tgData = await tgRes.json()
        if (!tgData.ok) return NextResponse.json({ error: "Cannot send messages to this group. Make sure the bot is added to the group and has permission to send messages." }, { status: 400 })
      } catch {
        return NextResponse.json({ error: "Failed to verify Telegram group. Check the Group ID." }, { status: 400 })
      }
    }

    const channel = await prisma.alertChannel.create({ data: { userId, type, value, label: label || "" } })

    if (type === "email" && value) {
      const verifyUrl = APP_URL + "/api/verify-email?token=" + channel.verifyToken
      try {
        await resend.emails.send({
          from: "Wallert <" + (process.env.ALERT_FROM_EMAIL || "onboarding@resend.dev") + ">",
          to: value,
          subject: "Verify your email for Wallert alerts",
          html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;"><div style="background:#00b892;padding:20px 32px;text-align:center;"><span style="color:#fff;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;">Email verification</span></div><div style="padding:32px;"><p style="color:#333;font-size:14px;line-height:1.6;margin:0 0 20px 0;">Someone added this email as an emergency alert contact on Wallert. Click below to confirm you accept receiving emergency alerts at this address.</p><div style="text-align:center;margin:28px 0;"><a href="${verifyUrl}" style="display:inline-block;background:#00b892;color:#fff;padding:14px 40px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Verify this email</a></div><p style="color:#999;font-size:12px;margin:20px 0 0 0;">If you didn't expect this, you can safely ignore this email.</p></div><div style="border-top:1px solid #eee;padding:16px 32px;text-align:center;"><p style="color:#ccc;font-size:10px;margin:0;">Wallert</p></div></div>`,
        })
      } catch (err) {
        console.error("Verification email failed:", err.message)
      }
    }

    return NextResponse.json({ channel }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 500 })
  }
}

function describeChannel(channel) {
  return channel.type === "email" ? "the email contact " + channel.value : "the Telegram group" + (channel.label ? " \"" + channel.label + "\"" : "")
}

// Delay an action that would stop a working channel from receiving alerts.
async function requestChannelChange(userId, channel, action) {
  const now = new Date()
  await prisma.alertChannel.update({ where: { id: channel.id }, data: { pendingAction: action, pendingActionAt: now } })
  const effectiveAt = new Date(now.getTime() + PROTECTION_DELAY_MS)
  const verb = action === "delete" ? "removed" : "disabled"
  await notifyProtectionChange(userId, prisma, "Alerts to " + describeChannel(channel) + " will be " + verb + ".", effectiveAt)
  return NextResponse.json({ ok: true, pending: true, effectiveAt })
}

export async function PATCH(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id, isActive } = await request.json()
    if (typeof id !== "string" || typeof isActive !== "boolean") return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    const channel = await prisma.alertChannel.findUnique({ where: { id } })
    if (!channel || channel.userId !== userId) return NextResponse.json({ error: "Not found" }, { status: 404 })

    // Enabling (or cancelling a pending disable/delete) is immediate.
    if (isActive) {
      await prisma.alertChannel.update({ where: { id }, data: { isActive: true, pendingAction: null, pendingActionAt: null } })
      return NextResponse.json({ ok: true })
    }

    if (channel.pendingAction) return NextResponse.json({ ok: true, pending: true })
    if (channelDelivers(channel)) return requestChannelChange(userId, channel, "disable")

    await prisma.alertChannel.update({ where: { id }, data: { isActive: false } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Channel update error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })
    const channel = await prisma.alertChannel.findUnique({ where: { id } })
    if (!channel || channel.userId !== userId) return NextResponse.json({ error: "Not found" }, { status: 404 })

    if (channel.pendingAction === "delete") return NextResponse.json({ ok: true, pending: true })
    if (channelDelivers(channel)) return requestChannelChange(userId, channel, "delete")

    // The channel cannot deliver anything (inactive, unverified or unlinked): delete now.
    await prisma.alertChannel.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Channel delete error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
