import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";


export async function POST(request: NextRequest) {
  try {

    const { userEmail } = await request.json()
    const hashedKey = await bcrypt.hash(userEmail, 10)

    const existedEmail = await prisma.apikey.findUnique({
      where: { email: userEmail }
    })
    if (existedEmail) {
      return NextResponse.json(
        { error: 'this email already asked for api before' }, { status: 400 }
      )
    }

    const newKey = await prisma.apikey.create({
      data: {
        email: userEmail,
        key: hashedKey
      }
    })

    if (!newKey) {
      return NextResponse.json(
        { error: "error while storing apikey" },
        { status: 400 },)
    }


    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {

  }

}
