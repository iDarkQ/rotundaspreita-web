/*
  Warnings:

  - The primary key for the `Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Study` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_studyId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP CONSTRAINT "Option_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "questionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Option_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Option_id_seq";

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "studyId" SET DATA TYPE TEXT,
ALTER COLUMN "answerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Question_id_seq";

-- AlterTable
ALTER TABLE "Study" DROP CONSTRAINT "Study_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Study_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Study_id_seq";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_studyId_fkey" FOREIGN KEY ("studyId") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
