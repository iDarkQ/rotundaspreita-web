"use server";

import {
  createOrReplaceSubscriptionQuery,
  deleteManySubscriptionQuery,
  fetchSubscriptionQuery,
  updateManySubscriptionQuery,
} from "@/app/_lib/queries/subscription";

export const serverStartSubscription = async (
  userId: string,
  stripeSubId: string,
  extendTo?: number,
) =>
  createOrReplaceSubscriptionQuery({
    user: { connect: { id: userId } },
    stripeSubId,
    expiresAt: extendTo ? new Date(extendTo * 1000) : undefined,
  });

export const serverRenewSubscription = async (subId: string, extendTo: number) =>
  updateManySubscriptionQuery(
    { stripeSubId: subId },
    {
      expiresAt: new Date(extendTo * 1000),
    },
  );

export const serverFetchUserSubscription = async (userId: string) =>
  fetchSubscriptionQuery({ userId });
