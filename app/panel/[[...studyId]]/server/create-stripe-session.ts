"use server";

import { stripe } from "@/app/_lib/stripe";
import { verifySession } from "@/app/_services/user-service";

export const createCheckoutSession = async () => {
  const user = await verifySession();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      { price: process.env.STRIPE_PRICE_ID!, quantity: 1 },
      {
        // One-time starter fee
        price: process.env.STRIPE_STARTER_FEE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: "subscription",

    metadata: { userId: user.id },
    success_url: `${process.env.BASE_URL}/panel`,
    cancel_url: `${process.env.BASE_URL}`,
  });

  return session.url;
};
