"use server";

import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { createOrReplaceSubscriptionQuery, fetchSubscriptionQuery } from "@/lib/queries/subscription";
import { stripe } from "@/lib/stripe";

export const startSubscription = async (userId: string, stripeSubId: string) => createOrReplaceSubscriptionQuery({ user: { connect: { id: userId } }, stripeSubId, createdAt: new Date(), expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

export const cancelSubscription = async () => {
    const user = await fetchLoggedUser();
    if (!user) return;

    const subscription = await fetchUserSubscription(user.id);
    if (!subscription) return;
    stripe.subscriptions.update(subscription.stripeSubId, {
        cancel_at_period_end: true,
    });
}

export const uncancelSubscription = async () => {
    const user = await fetchLoggedUser();
    if (!user) return;

    const subscription = await fetchUserSubscription(user.id);
    if (!subscription) return;

    stripe.subscriptions.update(subscription.stripeSubId, {
        cancel_at_period_end: false,
    });
}

export const fetchUserSubscription = async (userId: string) => fetchSubscriptionQuery({ userId });