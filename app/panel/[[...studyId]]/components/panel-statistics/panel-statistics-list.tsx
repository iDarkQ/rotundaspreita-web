import { StatisticsCard } from "@/app/_components/statistics-card";
import { AnalyticsDto } from "@/app/_lib/dtos/test-results/analytics.dto";

interface Props {
  analytics: AnalyticsDto | undefined;
}

export const PanelStatisticsList = ({ analytics }: Props) => (
  <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
    <StatisticsCard
      name="Testes concluídos"
      hint="Número de testes diferentes em que respondeu a, pelo menos, uma pergunta deste estudo."
      value={analytics?.finishedTests.toString() ?? "0"}
      className="col-span-1"
    />
    <StatisticsCard
      name="Resultados médios dos testes %"
      hint="Respostas corretas a dividir por todas as respostas dadas neste estudo, em todas as tentativas. Perguntas em branco contam como erradas."
      value={(analytics?.averageTestResult.toString() ?? "0") + "%"}
      className="col-span-1"
    />
    <StatisticsCard
      name="Perguntas vistas %"
      hint="Perguntas diferentes que já respondeu a dividir pelo total de perguntas do estudo. Repetir uma pergunta não aumenta este valor."
      value={(analytics?.visitedQuestions.toString() ?? "0") + "%"}
      className="col-span-1 w-full"
    />
  </div>
);
