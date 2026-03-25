import 'dotenv/config'
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";


const terms: string = "test page"
const privacy: string = "test privacy"

async function addingPages() {
  const admin = await prisma.user.findUniqueOrThrow({
    where: { email: "admin@beentra.fi" },
  });

  const pages = [
    { title: "Terms", slug: "terms", text: terms },
    { title: "Privacy", slug: "privacy", text: privacy },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: { title: page.title, text: page.text },
      create: {
        ...page,
        author: { connect: { id: admin.id } },
      },
    });
  }
  console.log("✅ Pages are seeded");
}



async function addingAdmin() {
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

async function main() {
  await addingAdmin();
  await addingPages();

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
