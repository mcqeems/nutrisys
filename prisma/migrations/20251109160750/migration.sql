-- AlterTable
ALTER TABLE "food_logs" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "journal_entries" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "summary" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "user_info" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "user_targets" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "chat_logs" ADD CONSTRAINT "chat_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_logs" ADD CONSTRAINT "food_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary" ADD CONSTRAINT "summary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_targets" ADD CONSTRAINT "user_targets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
