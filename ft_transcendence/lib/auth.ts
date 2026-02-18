

import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      fname: { type: "string", required: false },
      lname: { type: "string", required: false },
      username: { type: "string", required: false },
      phone: { type: "string", required: false },
      role: { type: "string", required: false },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    },
  },
  customProviders: [
    {
      id: "42-school",
      name: "42 School",
      type: "oauth2",
      clientId: process.env.FORTY_TWO_CLIENT_ID!,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET!,
      authorizationUrl: "https://api.intra.42.fr/oauth/authorize",
      tokenUrl: "https://api.intra.42.fr/oauth/token",
      userInfoUrl: "https://api.intra.42.fr/v2/me",
      scopes: ["public"],
      mapUserInfo(profile) {
        return {
          id: profile.id.toString(),
          name: profile.displayname,
          email: profile.email,
          image: profile.image?.link,
        }
      },
    },
  ],
  plugins: [nextCookies()]
});




// old solution
// import { SignJWT, jwtVerify } from 'jose';
// import { cookies } from 'next/headers';
// import { redirect } from "next/navigation";

// const secret = new TextEncoder().encode(
//   process.env.JWT_SECRET
// );

// export type Session = {
//   email: string;
//   role: string;
//   userId?: number;
// }

// export async function createToken(payload: any) {
//   return await new SignJWT(payload as any)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('7d')
//     .sign(secret);
// }

// export async function verifyToken(token: string): Promise<Session | null> {
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return payload as Session;
//   } catch (error) {
//     return null;
//   }
// }


// export async function getSession(): Promise<Session | null> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('auth-token')?.value;

//   if (!token) return null;

//   return await verifyToken(token);
// }

// export async function requireAuth() {
//   const session = await getSession();

//   if (!session) {
//     redirect('/login');
//   }

//   return session;
// }
