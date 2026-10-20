-- AlterEnum
ALTER TYPE "ReminderDeliveryStatus" ADD VALUE 'FAILED';

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '30 days';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "onboardingDeferredAt" TIMESTAMP(3);
