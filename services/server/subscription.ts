"use server";

import { createSubscriptionQuery, deleteSubscriptionQuery, fetchSubscriptionQuery } from "@/lib/queries/subscription";
import { stripe } from "@/lib/stripe";

export const startSubscription = async (userId: string, stripeSubId: string) => createSubscriptionQuery({ user: { connect: { id: userId } }, stripeSubId });
export const cancelSubscription = async (userId: string) => {
    const subscription = await deleteSubscriptionQuery({ userId })

    await stripe.subscriptions.cancel(subscription.stripeSubId);
}

export const fetchUserSubscription = async (userId: string) => fetchSubscriptionQuery({ userId });