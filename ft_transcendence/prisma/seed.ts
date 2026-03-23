import 'dotenv/config'
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("ABCD@123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@beentra.fi" },
    update: {},
    create: {
      email: "admin@beentra.fi",
      username: "admin",
      fullName: "Admin",
      passwordHash: hashedPassword,
      role: 'admin',
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
