-- DropIndex
DROP INDEX "Subscription_stripeSubId_key";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "stripeSubId" DROP NOT NULL,
ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '30 days';
