import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { Divider } from "@/app/_components/divider";
import { fetchAllStudies } from "@/services/study-service";
import { QuestionsStudies } from "@/app/questions/[[...studyId]]/components/questions-studies";
import { QuestionsManage } from "@/app/questions/[[...studyId]]/components/questions-manage";

interface Props {
  params: Promise<{ studyId: string[] }>;
}

export default async function Test({ params }: Props) {
  const loadedParams = await params;
  const studyId = loadedParams.studyId?.[0];
  const studies = await fetchAllStudies();

  const foundStudy = studies.find((s) => s.id === studyId);
  const selectedStudy = foundStudy ?? studies?.[0] ?? null;

  return (
    <Section>
      <PositionedBlob align="left" className="w-100 h-100 top-[90%]">
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob align="right" className="w-100 h-100 top-[10%]">
        <Blob4 />
      </PositionedBlob>

      <Text as="h1">Todas as perguntas existentes</Text>

      <QuestionsStudies studies={studies} selectedStudy={selectedStudy} />
      <Divider orientation="horizontal" />
      <QuestionsManage studyId={selectedStudy?.id} />
    </Section>
  );
}

export const data = [
  {
    question: "Qual a frase que melhor define previsão?",
    answer: "A",
    options: [
      {
        option: "A",
        label:
          "Imaginar o que pode acontecer, a partir dos índices pertinentes",
      },
      {
        option: "B",
        label: "Classificação dos índices em categorias com significado",
      },
      {
        option: "C",
        label:
          "Conjunto de procedimentos do condutor para detetar a presença ou ausência de índices",
      },
    ],
  },
  {
    question: "O sentido vestibular permite:",
    answer: "B",
    options: [
      {
        option: "A",
        label: "A visão periférica.",
      },
      {
        option: "B",
        label:
          "A manutenção do equilíbrio e orientação da posição de cada parte do corpo.",
      },
      {
        option: "C",
        label: "A perceção da velocidade de circulação dos veículos.",
      },
    ],
  },
  {
    question:
      "O desempenho do condutor durante a atividade da condução, pode ser",
    answer: "C",
    options: [
      {
        option: "A",
        label:
          "A fadiga, a idade, as drogas, o álcool, os conflitos psicológicos, as condições atmosféricas adversas.",
      },
      {
        option: "B",
        label: "A sonolência, a idade, a fadiga, as doenças",
      },
      {
        option: "C",
        label:
          "A idade, a fadiga, as doenças, os conflitos psicológicos, as drogas, o álcool, o estado da via e a estabilidade do veículo",
      },
    ],
  },
  {
    question:
      "No processo da condução, em que consiste a exploração preceptiva visual?",
    answer: "C",
    options: [
      {
        option: "A",
        label: "Na excitação dos órgãos sensoriais",
      },
      {
        option: "B",
        label: "Na deslocação dos olhos na cena visual.",
      },
      {
        option: "C",
        label: "No reconhecimento de objetos a partir de estímulos.",
      },
    ],
  },
];
