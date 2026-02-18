import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"
import { createId } from "@paralleldrive/cuid2"

async function main() {
  const userId = createId()
  await prisma.user.create({
    data: {
      id: userId,
      fname: "John",
      lname: "Doe",
      username: "johndoe",
      phone: "+1234567890",
      email: "admin@beentra.fi",
      name: "John Doe",
      role: "admin",
      accounts: {
        create: {
          id: createId(),
          accountId: userId,
          providerId: "credential",
          password: await bcrypt.hash("ABCD@123456", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }
    }
  })

  await prisma.event.createMany({
    data: [
      {
        id: "cmlrvi3ln0000jx0f6g77xpme",
        title: "New cool event9",
        date: new Date("2026-02-18"),
        timeFrom: new Date("2026-02-19T10:11:00"),
        timeTo: new Date("2026-02-19T13:11:00"),
        location: "School",
        organizer: "poophead",
        image: null,
        description: "",
      },
      {
        id: "cmls6hidd00003yyjmq3xnxzt",
        title: "home",
        date: new Date("2026-02-27"),
        timeFrom: new Date("2026-02-27T16:19:00"),
        timeTo: new Date("2026-02-27T17:19:00"),
        location: "where",
        organizer: "you",
        image: null,
        description: "",
      },
    ]
  })

  console.log("Seeded successfully!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
