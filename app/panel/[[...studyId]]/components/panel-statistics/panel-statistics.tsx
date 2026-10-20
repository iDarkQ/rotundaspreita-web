import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import {
  fetchAnalytics,
  fetchReadiness,
} from "@/app/_services/test-results-service";
import { PanelCategoryProgress } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-category-progress";
import { PanelExamCountdown } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-exam-countdown";
import { PanelReadinessCard } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-readiness-card";
import { PanelStatisticsEmpty } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-empty";
import { PanelStatisticsList } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-list";
import { PanelStatisticsChartList } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-chart-list";
import { PanelStatisticsTitle } from "@/app/panel/[[...studyId]]/components/panel-statistics-title";

interface Props {
  defaultStudyId?: string;
}

export const PanelStatistics = async ({ defaultStudyId }: Props) => {
  const [analytics, readiness] = defaultStudyId
    ? await Promise.all([
        fetchAnalytics(defaultStudyId),
        fetchReadiness(defaultStudyId),
      ])
    : [undefined, undefined];

  if (!analytics) {
    return <PanelStatisticsEmpty />;
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <PanelStatisticsTitle />
      {readiness && (
        <>
          <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
            <PanelReadinessCard
              readiness={readiness}
              className="lg:col-span-2"
            />
            <PanelExamCountdown
              countdown={readiness.examCountdown}
            />
          </div>
          <PanelCategoryProgress
            studyId={readiness.studyId}
            categories={readiness.categories}
          />
        </>
      )}
      <PanelStatisticsList analytics={analytics} />
      <PanelStatisticsChartList analytics={analytics} />
    </div>
  );
};
