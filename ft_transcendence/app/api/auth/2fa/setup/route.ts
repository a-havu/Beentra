import { NextResponse, NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { generateSecret, generateURI } from "otplib";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  // Generate a secret
  const secret = generateSecret();

  // Generate QR code URI for authenticator apps
  const uri = generateURI({
    issuer: "Beentra",
    label: session.email,
    secret,
  });

  const qrCode = await QRCode.toDataURL(uri);


  await prisma.user.update({
    where: { id: session.userId },
    data: { twoFactorSecret: secret, twoFactorEnabled: true },
  });
 

  console.log("2FA secret:", secret);

  return NextResponse.json({ qrCode });
}

export async function POST(request:NextRequest){



}