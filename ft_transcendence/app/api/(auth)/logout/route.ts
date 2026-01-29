import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const response = NextResponse.json({success: 'true'})
    response.cookies.delete("auth-token");
   return response
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })

  }
}