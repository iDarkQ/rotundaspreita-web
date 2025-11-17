/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OptionLetter" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_answerId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "category" TEXT;

-- DropTable
DROP TABLE "Answer";

-- DropEnum
DROP TYPE "AnswerLetter";

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "letter" "OptionLetter" NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
