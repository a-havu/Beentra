/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `title` on the `Page` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PageTitle" AS ENUM ('terms', 'privacy');

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "title",
ADD COLUMN     "title" "PageTitle" NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "oneLiner" TEXT NOT NULL,
    "link" TEXT,
    "techStack" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT,
    "image" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_title_key" ON "Page"("title");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
