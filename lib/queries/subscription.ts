"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export const createSubscriptionQuery = async (data: Prisma.SubscriptionCreateInput) =>
    prisma.subscription.create({ data })

export const deleteSubscriptionQuery = async (where: Prisma.SubscriptionWhereUniqueInput) => prisma.subscription.delete({ where })

export const fetchSubscriptionQuery = async (where: Prisma.SubscriptionWhereInput) => prisma.subscription.findFirst({ where });