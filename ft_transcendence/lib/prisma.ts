import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../lib/generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
console.log("adapter:", adapter)
const prisma = new PrismaClient({ adapter })
console.log("adapter:", adapter)
export { prisma }