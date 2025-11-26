/*
  Warnings:

  - You are about to drop the column `analyticsId` on the `TestResult` table. All the data in the column will be lost.
  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studyId` to the `TestResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_studyId_fkey";

-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_analyticsId_fkey";

-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "analyticsId",
ADD COLUMN     "studyId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Analytics";

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;
