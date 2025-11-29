"use client";

import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Divider } from "@/app/_components/divider";
import { SubscriptionCard } from "@/app/_components/layout/navbar/navbar-items-list/subscription-card";
import { Text } from "@/app/_components/text";

import dayjs from "dayjs";
import { Banner } from "@/app/_components/banner";
import {
  cancelSubscription,
  uncancelSubscription,
} from "@/services/server/subscription";
import { logoutUser } from "@/app/_components/layout/navbar/server/logout";
import { useNavbarManager } from "@/app/_components/layout/navbar/providers/navbar-manager";

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
                  ? "Renew Subscription"
                  : "Cancel Subscription"}
              </Text>
            </Button>
          </>
        ) : (
          <Banner center>
            <Text>You dont have a valid subscription</Text>
          </Banner>
        )}
        {subscription?.cancelled && !hasExpired && (
          <Text>
            Your subscription has been cancelled and you wont be charged the
            following month. You can still use your account until that date. You
            can renew your subscription any time with the button above.
          </Text>
        )}
      </DialogPart>
      <Divider />
      <DialogPart>
        <Button variant="contained" onClick={logoutUser}>
          <Text className="text-white!">Logout</Text>
        </Button>
      </DialogPart>
    </Dialog>
  );
};
