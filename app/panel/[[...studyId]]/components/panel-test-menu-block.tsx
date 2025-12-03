"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { Subscription, User } from "@/app/generated/prisma/browser";
import { PanelRenewSubscriptionButton } from "@/app/panel/[[...studyId]]/components/panel-renew-subscription-button";
import { useState } from "react";

interface Props {
  subscription: Subscription | null;
  user: User;
  hasExpired: boolean;
}

export const PanelTestMenuBlock = ({
  user,
  hasExpired,
  subscription,
}: Props) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  const shouldShowMessage = !user.admin && (!subscription || hasExpired);

  return (
    <>
      {shouldShowMessage && (
        <div className="absolute z-1 flex h-full w-full flex-col items-center justify-center gap-2 rounded-sm bg-black/70 p-5">
          <Text as="h3" className="text-white!">
            Não tem uma subscrição válida
          </Text>
          <Text as="p" className="text-center text-white!">
            Pode renovar a sua subscrição clicando no botão abaixo. Será
            redirecionado para o nosso provedor de pagamentos para efetuar o
            pagamento.
          </Text>
          <PanelRenewSubscriptionButton />
          {!user.usedFreeTest && (
            <Button variant="outlined" onClick={() => setShow(false)}>
              <Text>Faça um teste grátis</Text>
            </Button>
          )}
        </div>
      )}
    </>
  );
};
