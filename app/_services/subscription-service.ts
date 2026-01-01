"use server";

import { serverFetchUserSubscription } from "@/app/_services/server/subscription-service";
import { stripe } from "@/app/_lib/stripe";
import { verifySession } from "@/app/_services/user-service";
import { updateUniqueSubscriptionQuery } from "@/app/_lib/queries/subscription";

export const fetchLoggedUserSubscription = async () => {
  const session = await verifySession();

  return serverFetchUserSubscription(session.id);
};

export const cancelSubscription = async () => {
  const session = await verifySession();

  const subscription = await serverFetchUserSubscription(session.id);
  if (!subscription || !subscription.stripeSubId) return;

  await updateUniqueSubscriptionQuery({ id: subscription.id }, { cancelled: true })
  stripe.subscriptions.update(subscription.stripeSubId, {
    cancel_at_period_end: true,
  });
};

export const uncancelSubscription = async () => {
  const session = await verifySession();

  const subscription = await serverFetchUserSubscription(session.id);
  if (!subscription || !subscription.stripeSubId) return;
  await updateUniqueSubscriptionQuery({ id: subscription.id }, { cancelled: false })

  stripe.subscriptions.update(subscription.stripeSubId, {
    cancel_at_period_end: false,
  });
};
