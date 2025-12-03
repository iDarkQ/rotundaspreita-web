import { StatisticsCard } from "@/app/_components/statistics-card";
import { AnalyticsDto } from "@/app/_lib/dtos/test-results/analytics.dto";

interface Props {
  analytics: AnalyticsDto | undefined;
}

export const PanelStatisticsList = ({ analytics }: Props) => (
  <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
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
);
