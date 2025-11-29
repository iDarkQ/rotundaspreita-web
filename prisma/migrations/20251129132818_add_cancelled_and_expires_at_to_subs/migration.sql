-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "cancelled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '30 days';
