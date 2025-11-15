import { AnswerOption } from "@/app/_components/answer-option";
import { RadioGroup } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

export const TestOptions = ({ selected, setSelected }: Props) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  return (
    <RadioGroup className="flex flex-col gap-2">
      {data[selected - 1].options.map((option) => (
        <AnswerOption
          key={option.option}
          option={option.option}
          label={option.label}
          selected={
            answers[selected] ? answers[selected] === option.option : false
          }
          onClick={() => {
            if (selected < data.length && !answers[selected]) {
              setSelected((prev) => prev + 1);
            }
            setAnswers((prev) => ({ ...prev, [selected]: option.option }));
          }}
        />
      ))}
    </RadioGroup>
  );
};

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
