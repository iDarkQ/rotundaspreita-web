/*
  Warnings:

  - You are about to drop the column `analyticsId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_analyticsId_fkey";

-- DropIndex
DROP INDEX "User_analyticsId_key";

-- AlterTable
ALTER TABLE "Analytics" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "analyticsId";

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
