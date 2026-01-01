import { serverDeleteSubscription, serverRenewSubscription, serverStartSubscription } from "@/app/_services/server/subscription-service";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

export const POST = async (req: NextRequest) => {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const subscriptionId = session.subscription as string;

      if (!userId) return;

      await serverStartSubscription(userId, subscriptionId);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const subId = subscription.id;

      if (!subId) return;

      await serverDeleteSubscription(subId);
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const firstLine = invoice.lines.data[0];

      const subscriptionId = firstLine.parent?.subscription_item_details?.subscription ?? invoice.parent?.subscription_details?.subscription.toString();
      const extendTo = firstLine.period.end;

      if (!subscriptionId || !extendTo) {
        break;
      }

      await serverRenewSubscription(subscriptionId, extendTo);
      break;
    }
    default:
      break;
  }

  return new NextResponse();
};
