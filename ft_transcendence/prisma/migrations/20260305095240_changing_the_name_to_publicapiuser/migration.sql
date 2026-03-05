/*
  Warnings:

  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_publicCreatorId_fkey";

-- DropTable
DROP TABLE "ApiKey";

-- CreateTable
CREATE TABLE "PublicApiUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "publicUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicApiUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicApiUser_email_key" ON "PublicApiUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PublicApiUser_key_key" ON "PublicApiUser"("key");

-- CreateIndex
CREATE UNIQUE INDEX "PublicApiUser_publicUserId_key" ON "PublicApiUser"("publicUserId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publicCreatorId_fkey" FOREIGN KEY ("publicCreatorId") REFERENCES "PublicApiUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
