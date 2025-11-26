import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { StatisticsCard } from "@/app/_components/statistics-card";
import { fetchAnalytics } from "@/services/test-results-service";
import { PanelStatisticsChart } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-chart";
import { Banner } from "@/app/_components/banner";
import { Text } from "@/app/_components/text";

interface Props {
  defaultStudyId?: string;
}

export const PanelStatistics = async ({ defaultStudyId }: Props) => {
  const analytics = defaultStudyId && (await fetchAnalytics(defaultStudyId));

  if (!analytics) {
    return (
      <Banner className="w-full" center>
        <Text>Nenhum estudo foi selecionado</Text>
      </Banner>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-5 w-full">
        <StatisticsCard
          name="Testes concluídos"
          value={analytics?.finishedTests.toString() ?? "0"}
          className="col-span-1"
        />
        <StatisticsCard
          name="Resultados médios dos testes %"
          value={(analytics?.averageTestResult.toString() ?? "0") + "%"}
          className="col-span-1"
        />
        <StatisticsCard
          name="Perguntas vistas %"
          value={(analytics?.visitedQuestions.toString() ?? "0") + "%"}
          className="col-span-1 w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 w-full">
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
    </>
  );
};
