import { SignJWT, jwtVerify, errors } from "jose";
import { cookies } from "next/headers";
import type { JWTPayload } from "jose";
import { prisma } from "@/lib/prisma";
import handleLogout from "@/components/login/LogoutButton";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export type Session = {
  email: string;
  role: string;
  userId?: string;
  avatar_url: string;
};

interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: string;
  avatar_url: string | null;
}

export async function createToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function createTempToken(payload: {
  userId: string;
}): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(secret);
}

// export async function verifyToken(token: string): Promise<Session | null> {
//   try {
//     const { payload } = await jwtVerify<TokenPayload>(token, secret);

//     const foundUser = await prisma.user.findUnique({
//       where: { id: payload.userId },
//     });
//     if (!foundUser) {
//       const cookieStore = await cookies();
//       cookieStore.delete("auth-token");
//       return null;
//     }

//     return payload as Session;
//   } catch (error) {
//     return null;
//   }
// }

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify<TokenPayload>(token, secret);

    const foundUser = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!foundUser) {
      const cookieStore = await cookies();
      cookieStore.delete("auth-token");
      return null;
    }

    return payload as Session;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      const userId =
        error.payload.sub ?? (error.payload as TokenPayload).userId;
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { isOnline: false },
        });
        const cookieStore = await cookies();
        cookieStore.delete("auth-token");
      }
    }
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  return await verifyToken(token);
}
