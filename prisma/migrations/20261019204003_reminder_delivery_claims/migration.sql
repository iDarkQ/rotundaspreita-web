-- AlterEnum
ALTER TYPE "ReminderDeliveryStatus" ADD VALUE 'SENDING';

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '30 days';
