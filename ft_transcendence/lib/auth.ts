import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { JWTPayload } from "jose";


const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export type Session = {
  email: string
  role: string
  userId?: string
  avatar_url: string
}

interface TokenPayload extends JWTPayload {
  userId: string
  email: string
  role: string
  avatar_url: string
}

export async function createToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as Session;
  } catch (error) {
    return null;
  }
}


export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  return await verifyToken(token);
}
