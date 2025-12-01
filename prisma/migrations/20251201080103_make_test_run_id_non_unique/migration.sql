-- DropIndex
DROP INDEX "TestResult_testRunId_key";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '30 days';
