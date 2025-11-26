/*
  Warnings:

  - You are about to drop the column `completedTest` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[testRunId]` on the table `TestResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `testRunId` to the `TestResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestResult" ADD COLUMN     "testRunId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "completedTest";

-- CreateIndex
CREATE UNIQUE INDEX "TestResult_testRunId_key" ON "TestResult"("testRunId");
