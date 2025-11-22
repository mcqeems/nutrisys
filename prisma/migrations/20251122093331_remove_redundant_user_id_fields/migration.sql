/*
  Warnings:

  - You are about to drop the column `userId` on the `food_logs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `journal_entries` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `summary` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_info` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_targets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "food_logs" DROP CONSTRAINT "food_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "journal_entries" DROP CONSTRAINT "journal_entries_userId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "summary" DROP CONSTRAINT "summary_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_info" DROP CONSTRAINT "user_info_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_targets" DROP CONSTRAINT "user_targets_userId_fkey";

-- AlterTable
ALTER TABLE "food_logs" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "journal_entries" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "summary" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "user_info" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "user_targets" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "food_logs" ADD CONSTRAINT "food_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "summary" ADD CONSTRAINT "summary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_targets" ADD CONSTRAINT "user_targets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
