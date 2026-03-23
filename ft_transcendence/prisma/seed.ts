import 'dotenv/config'
import { PrismaClient } from "../lib/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("ABCD@1236544", 10);

  await prisma.user.upsert({
    where: { email: "admin@beentra.fi" },
    update: {},
    create: {
      email: "admin@beentra.fi",
      username: "admin",
      fullName: "Admin",
      passwordHash: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());