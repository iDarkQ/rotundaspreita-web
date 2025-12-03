"use client";

import { Subscription, User } from "@/app/generated/prisma/browser";
import { PanelRenewSubscriptionButton } from "@/app/panel/[[...studyId]]/components/panel-renew-subscription-button";
import { PanelTestMenuBlockAction } from "@/app/panel/[[...studyId]]/components/panel-test-menu-block/panel-test-menu-block-action";
import { PanelTestMenuBlockDescription } from "@/app/panel/[[...studyId]]/components/panel-test-menu-block/panel-test-menu-block-description";
import { PanelTestMenuBlockTitle } from "@/app/panel/[[...studyId]]/components/panel-test-menu-block/panel-test-menu-block-title";
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

  if (!shouldShowMessage) return;
  return (
    <div className="absolute z-1 flex h-full w-full flex-col items-center justify-center gap-2 rounded-sm bg-black/70 p-5">
      <PanelTestMenuBlockTitle />
      <PanelTestMenuBlockDescription />
      <PanelRenewSubscriptionButton />
      {!user.usedFreeTest && (
        <PanelTestMenuBlockAction onClick={() => setShow(false)} />
      )}
    </div>
  );
};
