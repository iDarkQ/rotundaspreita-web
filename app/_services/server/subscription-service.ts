"use server";

import {
  createOrReplaceSubscriptionQuery,
  fetchSubscriptionQuery,
} from "@/app/_lib/queries/subscription";

export const serverStartSubscription = async (
  userId: string,
  stripeSubId: string,
) =>
  createOrReplaceSubscriptionQuery({
    user: { connect: { id: userId } },
    stripeSubId,
export const serverRenewSubscription = async (subId: string, extendTo: number) =>
  updateManySubscriptionQuery(
    { stripeSubId: subId },
    {
      expiresAt: new Date(extendTo * 1000),
    },
  );

export const serverFetchUserSubscription = async (userId: string) =>
  fetchSubscriptionQuery({ userId });
