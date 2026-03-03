import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'
import { prisma } from "@/lib/prisma";
import { apikeyEmail } from '@/lib/nodemailer'

export async function POST(request: NextRequest) {
  try {

    const { userEmail } = await request.json()
    const apiKey = crypto.randomBytes(32).toString('hex')

    await prisma.apikey.upsert({
      where: { email: userEmail },
      update: {
        key: apiKey,
      },
      create: {
        email: userEmail,
        key: apiKey,
      }
    })
    await apikeyEmail({ email: userEmail, apikey: apiKey })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (e) {
    console.log('Error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

}
