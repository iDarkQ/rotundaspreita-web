"use client";

import { Banner } from "@/app/_components/banner";
import { Button } from "@/app/_components/button";
import { SubscriptionCard } from "@/app/_components/layout/navbar/navbar-items-list/subscription-card";
import { useNavbarManager } from "@/app/_components/layout/navbar/providers/navbar-manager";
import { Text } from "@/app/_components/text";
import {
  cancelSubscription,
  uncancelSubscription,
} from "@/app/_services/subscription-service";

export const NavbarSettingsSubscription = () => {
  const { subscription, setSubscription } = useNavbarManager();

  const handleSubscriptionButton = async () => {
    if (!subscription) return;

    if (subscription.cancelled) {
      await uncancelSubscription();
    } else {
      await cancelSubscription();
    }
    setSubscription((prev) => ({
      ...prev!,
      cancelled: !subscription.cancelled,
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      {!!subscription ? (
        <>
          <SubscriptionCard
            active={!!subscription}
            createdAt={subscription.createdAt}
            expiresAt={subscription.expiresAt}
          />
          <Button
            disabled={!subscription.stripeSubId}
            variant="text"
            onClick={handleSubscriptionButton}
          >
            <Text>
              {subscription?.cancelled
                ? "Renovar Subscrição"
                : "Cancelar Subscrição"}
            </Text>
          </Button>
        </>
      ) : (
        <Banner center>
          <Text>Não tem uma subscrição ativa</Text>
        </Banner>
      )}
      {subscription && !subscription?.stripeSubId && (
        <Text>
          A sua subscrição foi adicionada manualmente, por isso não pode
          cancelá-la, renová-la ou alterá-la. Pode iniciar uma nova subscrição
          no final do período da atual.
        </Text>
      )}
      {subscription?.stripeSubId && subscription?.cancelled && (
        <Text>
          A sua subscrição foi cancelada. Não será cobrado no próximo mês. Pode
          continuar a utilizar a sua conta até ao fim do período atual de
          faturação. Se desejar, pode renovar a sua subscrição a qualquer
          momento através do botão acima.
        </Text>
      )}
    </div>
  );
};
