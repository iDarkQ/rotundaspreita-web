"use server";

import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

export const createCheckoutSession = async () => {
    const user = await fetchLoggedUser();

    if (!user) return;

    const session = await stripe.checkout.sessions.create({
        line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
        mode: "subscription",
        metadata: { userId: user.id },
        success_url: `${process.env.BASE_URL}/checkout/success?checkoutId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
    });

    return session.url;
}
