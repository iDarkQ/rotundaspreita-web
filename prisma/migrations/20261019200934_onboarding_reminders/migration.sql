-- CreateEnum
CREATE TYPE "ReminderDeliveryStatus" AS ENUM ('PENDING', 'SENT');

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "expiresAt" SET DEFAULT now() + interval '30 days';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "examDate" TIMESTAMP(3),
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pushNotificationsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reminderTime" TEXT,
ADD COLUMN     "reminderTimezone" TEXT,
ADD COLUMN     "reminderWeekdays" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "weeklyTestGoal" INTEGER;

-- CreateTable
CREATE TABLE "PushSubscription" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReminderDelivery" (
    "id" TEXT NOT NULL,
    "localDate" TEXT NOT NULL,
    "status" "ReminderDeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastError" TEXT,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ReminderDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PushSubscription_endpoint_key" ON "PushSubscription"("endpoint");

-- CreateIndex
CREATE INDEX "ReminderDelivery_status_nextAttemptAt_idx" ON "ReminderDelivery"("status", "nextAttemptAt");

-- CreateIndex
CREATE UNIQUE INDEX "ReminderDelivery_userId_localDate_key" ON "ReminderDelivery"("userId", "localDate");

-- AddForeignKey
ALTER TABLE "PushSubscription" ADD CONSTRAINT "PushSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReminderDelivery" ADD CONSTRAINT "ReminderDelivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
