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

  if (!show) return;

  return (
    <>
      {(!subscription || (hasExpired && !user.admin)) && (
        <div className="p-5 gap-2 flex flex-col items-center justify-center rounded-sm absolute w-full h-full bg-black/70 z-1">
          <Text as="h3" className="text-white!">
            Não tem uma subscrição válida
          </Text>
          <Text as="p" className="text-white! text-center">
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
