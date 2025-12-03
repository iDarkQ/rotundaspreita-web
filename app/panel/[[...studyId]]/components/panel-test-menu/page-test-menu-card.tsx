"use client";

import { Card } from "@/app/_components/card";
import { Study } from "@/app/generated/prisma/client";
import { PageTestMenuCardDescription } from "@/app/panel/[[...studyId]]/components/panel-test-menu/page-test-menu-card-description";
import { PageTestMenuCardTitle } from "@/app/panel/[[...studyId]]/components/panel-test-menu/page-test-menu-card-title";
import { PanelTestMenuCardSettings } from "@/app/panel/[[...studyId]]/components/panel-test-menu/panel-test-menu-card-settings";
import clsx from "clsx";

interface Props {
  studies: Study[];
  defaultStudyId: string;
  categories: string[];
  className?: string;
}

export const PageTestMenuCard = ({
  studies,
  defaultStudyId,
  className,
  categories,
}: Props) => (
  <Card className={clsx("w-full gap-2", className && className)}>
    <PageTestMenuCardTitle />
    <PageTestMenuCardDescription />
    <PanelTestMenuCardSettings
      studies={studies}
      defaultStudyId={defaultStudyId}
      categories={categories}
    />
  </Card>
);
