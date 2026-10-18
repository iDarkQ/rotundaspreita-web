"use client";

import { User } from "@/app/generated/prisma/browser";
import { PanelRenewSubscriptionButton } from "@/app/panel/[[...studyId]]/components/panel-renew-subscription-button";
import { PanelTestMenuBlockAction } from "@/app/panel/[[...studyId]]/components/panel-test-menu-block/panel-test-menu-block-action";
import { PanelTestMenuBlockDescription } from "@/app/panel/[[...studyId]]/components/panel-test-menu-block/panel-test-menu-block-description";
import { PanelTestMenuBlockTitle } from "@/app/panel/[[...studyId]]/components/panel-test-menu-block/panel-test-menu-block-title";
import { useState } from "react";

interface Props {
  user: User;
  hasExpired: boolean;
  checkoutUrl: string | null;
}

export const PanelTestMenuBlock = ({
  user,
  hasExpired,
  checkoutUrl,
}: Props) => {
  const [show, setShow] = useState(true);

  if (!show) return null;

  const shouldShowMessage = !user.admin && hasExpired;

  if (!shouldShowMessage) return;

  return (
    <div className="absolute z-1 flex h-full w-full flex-col items-center justify-center gap-2 rounded-sm bg-black/70 p-5">
      <PanelTestMenuBlockTitle />
      <PanelTestMenuBlockDescription />
      <PanelRenewSubscriptionButton checkoutUrl={checkoutUrl ?? ""} />
      {!user.usedFreeTest && (
        <PanelTestMenuBlockAction onClick={() => setShow(false)} />
      )}
    </div>
  );
};
