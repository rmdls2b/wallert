import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../../lib/security"
import { PROTECTION_DELAY_MS, notifyProtectionChange, shortAddress } from "../../../lib/protection"

const prisma = new PrismaClient()

async function addAddressToAlchemy(address) {
  await fetch("https://dashboard.alchemy.com/api/update-webhook-addresses", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-Alchemy-Token": process.env.ALCHEMY_API_KEY },
    body: JSON.stringify({ webhook_id: process.env.ALCHEMY_WEBHOOK_ID, addresses_to_add: [address], addresses_to_remove: [] }),
  })
}

export async function POST(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { id } = await request.json()
    if (typeof id !== "string") return NextResponse.json({ error: "Missing id" }, { status: 400 })
    const addr = await prisma.watchedAddress.findUnique({ where: { id } })
    if (!addr || addr.userId !== userId) return NextResponse.json({ error: "Not found" }, { status: 404 })

    // A pending disable/delete is cancelled immediately (it strengthens protection).
    if (addr.pendingAction) {
      await prisma.watchedAddress.update({ where: { id }, data: { pendingAction: null, pendingActionAt: null } })
      return NextResponse.json({ ok: true, cancelled: true })
    }

    // Enabling is immediate.
    if (!addr.isActive) {
      await prisma.watchedAddress.update({ where: { id }, data: { isActive: true } })
      await addAddressToAlchemy(addr.address)
      return NextResponse.json({ ok: true })
    }

    // Disabling is delayed: monitoring stays active and the trusted circle is told.
    const now = new Date()
    await prisma.watchedAddress.update({ where: { id }, data: { pendingAction: "disable", pendingActionAt: now } })
    const effectiveAt = new Date(now.getTime() + PROTECTION_DELAY_MS)
    await notifyProtectionChange(userId, prisma, "Monitoring of wallet " + shortAddress(addr.address) + " will be disabled.", effectiveAt)
    return NextResponse.json({ ok: true, pending: true, effectiveAt })
  } catch (error) {
    console.error("Toggle address error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
