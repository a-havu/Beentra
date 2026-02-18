import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    console.log("Login API called")
    const body = await request.json()
    console.log("Login API called:", body)
    const { userEmail, password } = body
    if (!userEmail || !password) {
      return NextResponse.json({
        errorMessage: "missing Email or Password"
      }, { status: 400 })
    }

    const result = await auth.api.signInEmail({
      body: {
        email: userEmail,
        password,
      },
      asResponse: true,
    })
    return result;
  } catch (e) {
    return NextResponse.json({ success: false, error: `Server error: ${e}` }, { status: 500 })

  }
}
