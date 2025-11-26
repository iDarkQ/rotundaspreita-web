/*
  Warnings:

  - You are about to drop the `TestResults` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OptionToTestResults` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestResults" DROP CONSTRAINT "TestResults_analyticsId_fkey";

-- DropForeignKey
ALTER TABLE "TestResults" DROP CONSTRAINT "TestResults_questionId_fkey";

-- DropForeignKey
ALTER TABLE "_OptionToTestResults" DROP CONSTRAINT "_OptionToTestResults_A_fkey";

-- DropForeignKey
ALTER TABLE "_OptionToTestResults" DROP CONSTRAINT "_OptionToTestResults_B_fkey";

-- DropTable
DROP TABLE "TestResults";

-- DropTable
DROP TABLE "_OptionToTestResults";

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "analyticsId" TEXT NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_analyticsId_fkey" FOREIGN KEY ("analyticsId") REFERENCES "Analytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
