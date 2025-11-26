"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { Pie } from "react-chartjs-2";
import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";

interface ChartData {
  label: string;
  data: number;
  color: string;
}

interface Props {
  data: ChartData[];
}

export const PanelStatisticsChart = ({ data }: Props) => {
  const values = data.map((d) => d.data);
  const responseTypes = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.data),
        backgroundColor: data.map((d) => d.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="flex items-center justify-center col-span-1 h-100">
      {values.every((v) => v <= 0) ? (
        <Text>Não foram fornecidos dados para exibir o gráfico circular</Text>
      ) : (
        <Pie data={responseTypes} />
      )}
    </Card>
  );
};
