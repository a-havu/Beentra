import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';


const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret || jwtSecret.trim() === '') {
  throw new Error(
    `JWT_SECRET environment variable is not defined or empty. Please check your .env file and ensure JWT_SECRET is set with a valid value.`
  );
}


const secret = new TextEncoder().encode(
  jwtSecret
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
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  return await verifyToken(token);
}