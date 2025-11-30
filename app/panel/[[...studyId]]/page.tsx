import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { notFound, redirect } from "next/navigation";
import { PageTestMenu } from "@/app/panel/[[...studyId]]/page-test-menu";
import { PanelStatistics } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics";
import {
  fetchAllStudies,
  fetchAllStudyCategories,
} from "@/services/study-service";
import { RouteNames } from "@/utils/route-names";
import { Button } from "@/app/_components/button";
import { createCheckoutSession } from "@/app/panel/[[...studyId]]/server/create-stripe-session";
import { PanelRenewSubscriptionButton } from "@/app/panel/[[...studyId]]/components/panel-renew-subscription-button";
import { fetchUserSubscription } from "@/services/server/subscription";
import dayjs from "dayjs";
import { PanelTestMenuBlock } from "@/app/panel/[[...studyId]]/components/panel-test-menu-block";

interface Props {
  params: Promise<{ studyId: string[] }>;
}

export default async function Panel({ params }: Props) {
  const loadedParams = await params;
  const studyId = loadedParams.studyId?.[0];
  const studies = await fetchAllStudies();
  const foundStudy = studies?.find((s) => s.id === studyId) ?? studies?.[0];
  const categories = foundStudy
    ? await fetchAllStudyCategories(foundStudy.id)
    : [];

  const user = await fetchLoggedUser();

  if (!user) {
    redirect(RouteNames.LOGIN);
  }

  const subscription = await fetchUserSubscription(user.id);

  const hasExpired = dayjs(subscription?.expiresAt).isBefore(
    subscription?.createdAt
  );

  return (
    <Section>
      <PositionedBlob align="left" className="w-100 h-100 top-[90%] opacity-50">
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob align="right" className="w-100 h-100 top-[10%] opacity-50">
        <Blob4 />
      </PositionedBlob>
      <div className="w-full flex flex-col items-start gap-5">
        <div>
          <Text as="p" className="text-primary!">
            Bem-vindo de volta, {user.name}
          </Text>
          <Text as="h1">Vamos praticar!</Text>
        </div>
        <div className="relative">
          <PanelTestMenuBlock
            user={user}
            hasExpired={hasExpired}
            subscription={subscription}
          />
          <PageTestMenu
            studies={studies}
            defaultStudyId={foundStudy?.id}
            categories={categories}
          />
        </div>
      </div>
      <Text as="h2" className="font-normal! text-start! w-full">
        Estatísticas do estudo selecionado
      </Text>
      <PanelStatistics defaultStudyId={foundStudy?.id} />
    </Section>
  );
}
