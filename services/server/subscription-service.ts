"use server";

import { createOrReplaceSubscriptionQuery, fetchSubscriptionQuery } from "@/lib/queries/subscription";

export const serverStartSubscription = async (userId: string, stripeSubId: string) => createOrReplaceSubscriptionQuery({ user: { connect: { id: userId } }, stripeSubId, createdAt: new Date(), expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

export const serverFetchUserSubscription = async (userId: string) => fetchSubscriptionQuery({ userId });