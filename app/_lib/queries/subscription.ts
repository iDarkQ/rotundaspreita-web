"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/app/_lib/prisma";

export const createOrReplaceSubscriptionQuery = async (
  data: Prisma.SubscriptionCreateInput,
) =>
  prisma.subscription.upsert({
    where: { userId: data.user.connect?.id },
    update: data,
    create: data,
  });

export const deleteManySubscriptionQuery = async (
  where: Prisma.SubscriptionWhereInput,
) => prisma.subscription.deleteMany({ where });

export const fetchSubscriptionQuery = async (
  where: Prisma.SubscriptionWhereInput,
) => prisma.subscription.findFirst({ where });

export const updateUniqueSubscriptionQuery = async (where: Prisma.SubscriptionWhereUniqueInput, data: Prisma.SubscriptionUpdateInput) => prisma.subscription.update({ where, data });
export const updateManySubscriptionQuery = async (where: Prisma.SubscriptionWhereInput, data: Prisma.SubscriptionUpdateInput) => prisma.subscription.updateMany({ where, data });