/*
  Warnings:

  - You are about to drop the column `answerId` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[analyticsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `analyticsId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answerId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "analyticsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "studyId" TEXT NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResults" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "analyticsId" TEXT NOT NULL,

    CONSTRAINT "TestResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OptionToTestResults" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OptionToTestResults_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_studyId_key" ON "Analytics"("studyId");

-- CreateIndex
CREATE INDEX "_OptionToTestResults_B_index" ON "_OptionToTestResults"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_analyticsId_key" ON "User"("analyticsId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResults" ADD CONSTRAINT "TestResults_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResults" ADD CONSTRAINT "TestResults_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToTestResults" ADD CONSTRAINT "_OptionToTestResults_A_fkey" FOREIGN KEY ("A") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToTestResults" ADD CONSTRAINT "_OptionToTestResults_B_fkey" FOREIGN KEY ("B") REFERENCES "TestResults"("id") ON DELETE CASCADE ON UPDATE CASCADE;
