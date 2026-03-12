import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pg', '@prisma/adapter-pg'], // added to allow prisma to work in server components
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
      protocol: 'https',
      hostname: 'ik.imagekit.io',
      },
    ],
  },
};

export default nextConfig;
