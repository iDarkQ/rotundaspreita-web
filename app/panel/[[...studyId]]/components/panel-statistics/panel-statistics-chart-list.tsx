import { AnalyticsDto } from "@/app/_lib/dtos/test-results/analytics.dto";
import { PanelStatisticsChart } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-chart";

interface Props {
  analytics: AnalyticsDto | undefined;
}

export const PanelStatisticsChartList = ({ analytics }: Props) => (
  <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
    <PanelStatisticsChart
      data={[
        {
          label: "Perguntas respondidas",
          data: analytics?.questionsAnswered ?? 0,
          color: "#326082",
        },
        {
          label: "Perguntas não respondidas",
          data: analytics?.questionsNotAnswered ?? 0,
          color: "#e9c46a",
        },
      ]}
    />
    <PanelStatisticsChart
      data={[
        {
          label: "Respostas corretas",
          data: analytics?.correctAnswers ?? 0,
          color: "#326082",
        },
        {
          label: "Respostas erradas",
          data: analytics?.wrongAnswers ?? 0,
          color: "#e9c46a",
        },
      ]}
    />
  </div>
);
