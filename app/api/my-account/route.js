import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../lib/security"
import { PROTECTION_DELAY_MS, ACCOUNT_DELETION_DELAY_MS } from "../../lib/protection"

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const userId = getUserFromRequest(request)
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: { orderBy: { createdAt: "asc" } },
        channels: { orderBy: { createdAt: "asc" } },
      },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    // Never expose secrets: verification tokens must only travel through the
    // verified inbox, otherwise a user could "verify" any contact themselves.
    const { password, emailVerifyToken, addresses, channels, ...safeUser } = user
    const effective = (at, delay) => (at ? new Date(at.getTime() + delay) : null)
    const safeChannels = channels.map(({ verifyToken, ...channel }) => ({
      ...channel,
      pendingEffectiveAt: effective(channel.pendingActionAt, PROTECTION_DELAY_MS),
    }))
    const safeAddresses = addresses.map(addr => ({
      ...addr,
      pendingEffectiveAt: effective(addr.pendingActionAt, PROTECTION_DELAY_MS),
    }))
    safeUser.deletionEffectiveAt = effective(user.deletionRequestedAt, ACCOUNT_DELETION_DELAY_MS)
    return NextResponse.json({ user: safeUser, addresses: safeAddresses, channels: safeChannels })
  } catch (error) {
    console.error("My-account error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
