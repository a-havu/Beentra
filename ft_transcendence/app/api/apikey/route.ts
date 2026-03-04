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
    const emailSentStatus = await apikeyEmail({ email: userEmail, apikey: apiKey })

    if (!emailSentStatus) {
      await prisma.apikey.delete({
        where: { email: userEmail }
      })
      return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 })
    }
    return NextResponse.json({ success: true, message: 'API key sent to your email' }, { status: 200 })
  }
  catch (e) {
    console.log('Error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

}
