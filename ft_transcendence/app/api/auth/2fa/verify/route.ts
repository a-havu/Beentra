import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import { verify } from "otplib"

export async function POST(request: NextRequest) {
  const { code } = await request.json()

  // get user and their secret from DB
  const session = await getSession()
  const user = await prisma.user.findUnique({ where: { id: session?.userId } })

  const isValid = await verify({ secret: user?.twoFactorSecret, token: code })

  if (!isValid) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 })
  }

  await prisma.user.update({
    where: { id: user?.id },
    data: { twoFactorEnabled: true },
  })

  return NextResponse.json({ success: true })
}
