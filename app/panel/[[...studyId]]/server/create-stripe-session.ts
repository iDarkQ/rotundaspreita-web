"use server";

import { stripe } from "@/lib/stripe";
import { verifySession } from "@/services/user-service";

export const createCheckoutSession = async () => {
    const user = await verifySession();

    const session = await stripe.checkout.sessions.create({
        line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
        mode: "subscription",
        metadata: { userId: user.id },
        success_url: `${process.env.BASE_URL}/checkout/success?checkoutId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
    });

    return session.url;
}
