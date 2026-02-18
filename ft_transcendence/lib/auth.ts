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
