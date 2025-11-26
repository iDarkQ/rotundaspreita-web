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

  return (
    <Section>
      <PositionedBlob align="left" className="w-100 h-100 top-[90%]">
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob align="right" className="w-100 h-100 top-[10%]">
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
              <Button variant="outlined">
                <Text>Faça um teste grátis</Text>
              </Button>
            )}
          </div>
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
