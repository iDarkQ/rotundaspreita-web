import { Button } from "@/app/_components/button";
import { TestCard } from "@/app/_components/home/test-card";
import { Link } from "@/app/_components/link";
import { Section } from "@/app/_components/section";
import { StatisticsCard } from "@/app/_components/statistics-card";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { RouteNames } from "@/app/_utils/route-names";

export const HomeHero = () => (
  <Section>
    <PositionedBlob align="left" className="w-100 h-100 top-[65vh] opacity-50">
      <Blob1 />
    </PositionedBlob>
    <PositionedBlob
      align="right"
      className="w-100 h-100 top-[-10vh] opacity-50"
    >
      <Blob4 />
    </PositionedBlob>

    <div className="flex items-center justify-center gap-10 min-h-[65vh] max-xl:flex-col! max-xl:mt-20">
      <div className="w-full flex flex-col gap-5 flex-5">
        <Text
          as="h1"
          className="text-6xl! max-2xl:text-5xl! max-md:text-4xl! max-sm:text-3xl!"
        >
          Torne-se Instrutor ou Diretor de Escola de Condução
        </Text>
        <Text>
          Treine com mini-exames reais: 30 perguntas em 30 minutos. Mais de 900
          questões, análises inteligentes e automações que aceleram o seu
          progresso.
        </Text>
        <div className="flex gap-2">
          <Link link="#purchase">
            <Button variant="contained">
              <Text className="text-white!">Ver Plano</Text>
            </Button>
          </Link>
          <Link link={RouteNames.LOGIN}>
            <Button variant="outlined">
              <Text className="text-primary!">
                Registe-se para um teste gratuito
              </Text>
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatisticsCard
            name="Perguntas"
            value="900+"
            className="max-2xl:flex-1"
          />
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
      </div>
      <div className="w-full flex flex-col gap-5 flex-6">
        <TestCard />
      </div>
    </div>
  </Section>
);
