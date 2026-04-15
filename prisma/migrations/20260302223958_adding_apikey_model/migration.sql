-- CreateTable
CREATE TABLE "apikey" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apikey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apikey_email_key" ON "apikey"("email");

-- CreateIndex
CREATE UNIQUE INDEX "apikey_key_key" ON "apikey"("key");
