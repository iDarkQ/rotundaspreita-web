import { AnswerOption } from "@/app/_components/answer-option";
import { TestFeatureCard } from "@/app/_components/home/test-feature-card";
import { Tilt } from "@/app/_components/tilt";
import { RadioGroup } from "@headlessui/react";
import { IoMdListBox } from "react-icons/io";

export const AboutFeatureManyQuestions = async () => (
  <TestFeatureCard
    prefix={<IoMdListBox size={50} className="text-primary!" />}
    title="900+ Questões"
    description="Simule o ambiente de prova e melhore a sua gestão de tempo."
    align="right"
  >
    <Tilt angle="right" className="w-[80%] max-xl:w-[70%] max-xl:pt-10!">
      <RadioGroup className="relative flex h-min w-full flex-col gap-2">
        <AnswerOption
          label="ROTUNDÁSPREITA tem perguntas apenas para instrutores"
          option="A"
          selectable={false}
          className="absolute! -top-10 -right-10 w-full bg-white!"
        />
        <AnswerOption
          label="ROTUNDÁSPREITA tem perguntas apenas para diretores"
          className="bg-white!"
          option="B"
          selectable={false}
        />

        <AnswerOption
          label="ROTUNDÁSPREITA tem perguntas para instrutores e diretores"
          option="C"
          selectable={false}
          selected={true}
          className="bg-tuscan-sun-100! absolute! top-10 right-10 w-full"
        />
      </RadioGroup>
    </Tilt>
  </TestFeatureCard>
);
