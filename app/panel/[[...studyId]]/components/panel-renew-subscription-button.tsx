"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { createCheckoutSession } from "@/app/panel/[[...studyId]]/server/create-stripe-session";

export const PanelRenewSubscriptionButton = () => {
  return (
    <Button
      variant="contained"
      onClick={async () => {
        const url = await createCheckoutSession();
        if (!url) return;

        console.log({ url });

        window.open(url, "_blank");
      }}
    >
      <Text className="text-white!">Renovar Subscrição</Text>
    </Button>
  );
};
