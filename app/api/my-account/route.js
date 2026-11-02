import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getUserFromRequest } from "../../lib/security"

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
    // Never return verification tokens: they must only reach the inbox being
    // verified, otherwise a user could mark any third-party email as verified.
    const { password, emailVerifyToken, addresses, channels, ...safeUser } = user
    const safeChannels = channels.map(({ verifyToken, ...channel }) => channel)
    return NextResponse.json({ user: safeUser, addresses, channels: safeChannels })
  } catch (error) {
    console.error("My-account error:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
