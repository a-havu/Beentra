import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";


const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}


export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  return await verifyToken(token);
}

export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login?message=Please log in to access this page');
  }
  
  return session;
}