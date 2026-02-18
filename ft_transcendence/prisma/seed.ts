import { prisma } from "@/lib/prisma"
import { createId } from "@paralleldrive/cuid2"
import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"

const scryptAsync = promisify(scrypt)

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex")
  const buf = (await scryptAsync(password, salt, 64)) as Buffer
  return `${buf.toString("hex")}:${salt}`
}

async function main() {
  const userId = createId()
  const hashedPassword = await hashPassword("ABCD@123456")

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
          password: hashedPassword,
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
