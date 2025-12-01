-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '30 days';

-- AlterTable
ALTER TABLE "TestResult" ALTER COLUMN "optionId" DROP NOT NULL;
