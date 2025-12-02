"use server";

import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { serverFetchUserSubscription } from "@/app/_services/server/subscription-service";
import { stripe } from "@/app/_lib/stripe";
import { verifySession } from "@/app/_services/user-service";

export const fetchLoggedUserSubscription = async () => {
    const session = await verifySession();

    return serverFetchUserSubscription(session.id);
}

export const cancelSubscription = async () => {
    const session = await verifySession();

    const subscription = await serverFetchUserSubscription(session.id);
    if (!subscription) return;
    stripe.subscriptions.update(subscription.stripeSubId, {
        cancel_at_period_end: true,
    });
}

export const uncancelSubscription = async () => {
    const session = await verifySession();

    const subscription = await serverFetchUserSubscription(session.id);
    if (!subscription) return;

    stripe.subscriptions.update(subscription.stripeSubId, {
        cancel_at_period_end: false,
    });
}