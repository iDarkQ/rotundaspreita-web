import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { fetchAnalytics } from "@/app/_services/test-results-service";
import { PanelStatisticsEmpty } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-empty";
import { PanelStatisticsList } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-list";
import { PanelStatisticsChartList } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-chart-list";

interface Props {
  defaultStudyId?: string;
}

export const PanelStatistics = async ({ defaultStudyId }: Props) => {
  const analytics = defaultStudyId
    ? await fetchAnalytics(defaultStudyId)
    : undefined;

  if (!analytics) {
    return <PanelStatisticsEmpty />;
  }

  return (
    <>
      <PanelStatisticsList analytics={analytics} />
      <PanelStatisticsChartList analytics={analytics} />
    </>
  );
};
