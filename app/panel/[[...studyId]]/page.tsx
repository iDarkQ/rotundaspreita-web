import { Section } from "@/app/_components/section";
import { PageTestMenu } from "@/app/panel/[[...studyId]]/components/panel-test-menu/page-test-menu";
import { PanelStatistics } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics";
import {
  fetchAllStudies,
  fetchAllStudyCategories,
} from "@/app/_services/study-service";
import { PanelTestMenuBlock } from "@/app/panel/[[...studyId]]/components/panel-test-menu-block/panel-test-menu-block";
import { verifySession, verifySessionSubscription } from "@/app/_services/user-service";
import { PanelBlobs } from "@/app/panel/[[...studyId]]/components/panel-blobs";
import { PanelTitle } from "@/app/panel/[[...studyId]]/components/panel-title";
import { PanelWelcomeMessage } from "@/app/panel/[[...studyId]]/components/panel-welcome-message";
import { PanelStatisticsTitle } from "@/app/panel/[[...studyId]]/components/panel-statistics-title";

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

  const user = await verifySession();

  const subscription = await verifySessionSubscription();

  return (
    <Section>
      <PanelBlobs />
      <div className="flex w-full flex-col items-start gap-5">
        <div>
          <PanelWelcomeMessage name={user.name} />
          <PanelTitle />
        </div>
        <div className="relative">
          {studies.length > 0 && (
            <PanelTestMenuBlock
              user={user}
              hasExpired={!subscription}
            />
          )}
          <PageTestMenu
            studies={studies}
            defaultStudyId={foundStudy?.id}
            categories={categories}
          />
        </div>
      </div>
      <PanelStatisticsTitle />
      <PanelStatistics defaultStudyId={foundStudy?.id} />
    </Section>
  );
}
