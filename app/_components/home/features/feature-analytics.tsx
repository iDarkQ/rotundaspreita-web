import { TestFeatureCard } from "@/app/_components/home/test-feature-card";
import { StatisticsCard } from "@/app/_components/statistics-card";
import { Tilt } from "@/app/_components/tilt";
import { PanelStatisticsChart } from "@/app/panel/[[...studyId]]/components/panel-statistics/panel-statistics-chart";
import { MdPieChart } from "react-icons/md";

export const FeatureAnalytics = async () => {
  return (
    <TestFeatureCard
      prefix={<MdPieChart size={50} className="text-primary!" />}
      title="Estatísticas Modernas"
      description="Painéis que mostram progresso, tempo por questão e acertos."
    >
      <Tilt className="w-full">
        <div className="flex w-full items-stretch gap-2 max-xl:flex-col">
          <div className="flex h-auto w-full flex-col gap-2">
            <StatisticsCard
              name="Testes concluídos"
              value="11"
              className="flex-1 justify-center"
            />
            <StatisticsCard
              name="Resultados médios dos testes %"
              value="95%"
              className="flex-1 justify-center"
            />
            <StatisticsCard
              name="Perguntas vistas %"
              value="41%"
              className="flex-1 justify-center"
            />
          </div>
          <PanelStatisticsChart
            data={[
              { label: "Perguntas respondidas", data: 340, color: "#326082" },
              {
                label: "Perguntas não respondidas",
                data: 520,
                color: "#e9c46a",
              },
            ]}
          />
        </div>
      </Tilt>
    </TestFeatureCard>
  );
};
