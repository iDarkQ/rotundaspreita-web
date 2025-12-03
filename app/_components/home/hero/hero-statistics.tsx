import { StatisticsCard } from "@/app/_components/statistics-card";

export const HeroStatistics = () => (
  <div className="flex flex-wrap gap-2">
    <StatisticsCard name="Perguntas" value="900+" className="max-2xl:flex-1" />
    <StatisticsCard
      name="Tempo de teste"
      value="30m"
      className="max-2xl:flex-1"
    />
    <StatisticsCard
      name="Perguntas/Teste"
      value="30"
      className="max-2xl:flex-1"
    />
  </div>
);
