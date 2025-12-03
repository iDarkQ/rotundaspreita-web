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

export const deleteSubscriptionQuery = async (
  where: Prisma.SubscriptionWhereUniqueInput,
) => prisma.subscription.delete({ where });

export const fetchSubscriptionQuery = async (
  where: Prisma.SubscriptionWhereInput,
) => prisma.subscription.findFirst({ where });
