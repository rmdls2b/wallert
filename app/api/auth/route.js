import { NextResponse } from "next/server"
import { verifyAdminPassword, adminErrorResponse } from "../../lib/security"

export async function POST(request) {
  try {
    const { password } = await request.json()
    const result = verifyAdminPassword(request, password)
    if (!result.ok) return adminErrorResponse(result)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
