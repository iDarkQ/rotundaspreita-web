"use client";

import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Divider } from "@/app/_components/divider";
import { SubscriptionCard } from "@/app/_components/layout/navbar/navbar-items-list/subscription-card";
import { Text } from "@/app/_components/text";

import dayjs from "dayjs";
import { Banner } from "@/app/_components/banner";
import { logoutUser } from "@/app/_components/layout/navbar/server/logout";
import { useNavbarManager } from "@/app/_components/layout/navbar/providers/navbar-manager";
import { cancelSubscription, uncancelSubscription } from "@/services/subscription-service";

interface Props {
  onClose: () => void;
}

export const NavbarSettingsDialog = ({ onClose }: Props) => {
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

  const hasExpired = dayjs(subscription?.expiresAt).isBefore(
    subscription?.createdAt
  );

  return (
    <Dialog open={true} title="Definições Do Perfil" onClose={onClose}>
      <DialogPart>
        {!!subscription && !hasExpired ? (
          <>
            <SubscriptionCard
              active={!hasExpired}
              createdAt={subscription.createdAt}
              expiresAt={subscription.expiresAt}
            />
            <Button variant="text" onClick={handleSubscriptionButton}>
              <Text>
                {hasExpired || subscription?.cancelled
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
        {subscription?.cancelled && !hasExpired && (
          <Text>
            A sua subscrição foi cancelada. Não será cobrado no próximo mês.
            Pode continuar a utilizar a sua conta até ao fim do período atual de
            faturação. Se desejar, pode renovar a sua subscrição a qualquer
            momento através do botão acima.
          </Text>
        )}
      </DialogPart>
      <Divider />
      <DialogPart>
        <Button variant="contained" onClick={logoutUser}>
          <Text className="text-white!">Encerrar Sessão</Text>
        </Button>
      </DialogPart>
    </Dialog>
  );
};
