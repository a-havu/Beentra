/*
  Warnings:

  - Changed the type of `title` on the `Page` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "title",
ADD COLUMN     "title" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PageTitle";

-- CreateIndex
CREATE UNIQUE INDEX "Page_title_key" ON "Page"("title");
