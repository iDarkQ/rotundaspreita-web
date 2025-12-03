import { AnswerOption } from "@/app/_components/answer-option";
import { ProgressBar } from "@/app/_components/progress-bar";
import { Blob3 } from "@/app/_components/svgs/blob-3";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { RadioGroup } from "@headlessui/react";

export const TestCard = () => (
  <div className="relative">
    <div className="from-baltic-blue-200 to-tuscan-sun-200 flex min-h-[360px] w-full flex-col justify-between gap-5 rounded-xl bg-linear-to-br p-6 text-white shadow-2xl">
      <div>
        <Text className="opacity-90">Teste De Instrutor — 30 perguntas</Text>
        <Text as="h3">Qual é o melhor sítio para se tornar instrutor?</Text>
      </div>

      <RadioGroup className="flex flex-col gap-2">
        <AnswerOption
          option="A"
          label="ROTUNDASPREITA. Uma maneira simples, moderna, clara e rápida de se tornar instrutor"
          selectable={false}
          selected={true}
          className="bg-black/5!"
        />
        <AnswerOption
          option="B"
          label="Estudo manual"
          selectable={false}
          className="bg-black/0!"
        />
      </RadioGroup>

      <ProgressBar value={12} max={30} label="Progresso" />
    </div>
    <PositionedBlob className="top-[0%] h-80 w-80 opacity-50" align="right">
      <Blob3 />
    </PositionedBlob>
  </div>
);
