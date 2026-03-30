-- DropForeignKey
ALTER TABLE "EventSubscription" DROP CONSTRAINT "EventSubscription_userId_fkey";

-- AddForeignKey
ALTER TABLE "EventSubscription" ADD CONSTRAINT "EventSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
