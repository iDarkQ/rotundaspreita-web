-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
