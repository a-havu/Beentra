import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

dotenv.config(); // loads .env into process.env

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
