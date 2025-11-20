import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import { Card } from "@/app/_components/card";
import { Section } from "@/app/_components/section";
import { StatisticsCard } from "@/app/_components/statistics-card";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { notFound } from "next/navigation";
import { PageTestMenu } from "@/app/panel/page-test-menu";

export default async function Panel() {
  const user = await fetchLoggedUser();

  if (!user) {
    notFound();
  }

  return (
    <Section>
      <PositionedBlob align="left" className="w-100 h-100 top-[90%]">
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob align="right" className="w-100 h-100 top-[10%]">
        <Blob4 />
      </PositionedBlob>
      <div className="w-full flex flex-col items-start gap-5">
        <div>
          <Text as="p" className="text-primary!">
            Bem-vindo de volta, {user.name}
          </Text>
          <Text as="h1">Vamos praticar!</Text>
        </div>
        <PageTestMenu />
      </div>
      <div className="grid grid-cols-4 gap-5 w-full">
        <StatisticsCard
          name="Testes concluídos"
          value="0"
          className="col-span-1"
        />
        <StatisticsCard
          name="Perguntas vistas"
          value="0"
          className="col-span-1"
        />
        <StatisticsCard
          name="Respostas corretas"
          value="0"
          className="col-span-1 w-full"
        />
        <StatisticsCard
          name="Respostas erradas"
          value="0"
          className="col-span-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 w-full">
        <Card className="flex items-center justify-center col-span-1">
          <Text>Aqui vou adicionar um gráfico circular</Text>
        </Card>
        {/* <Card className="flex items-center justify-center col-span-1 h-100">
          <Pie data={data}/>
          <Text>Aqui vou adicionar um gráfico circular</Text>
        </Card> */}
      </div>
    </Section>
  );
}

export const data = {
  labels: ["Questions Seen", "Questions Not Answered"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["#e9c46a", "#dae7f1"],
      borderWidth: 1,
    },
  ],
};
