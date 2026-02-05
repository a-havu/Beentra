import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export type Session = {
  email: string;
  role: string;
  userId?: string;
}

export async function createToken(payload: any) {
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string) : Promise<Session | null>{
  try {
    const { payload } = await jwtVerify(token, secret) ;
    return payload as Session;
  } catch (error) {
    return null;
  }
}


export async function getSession() : Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  return await verifyToken(token);
}

export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}