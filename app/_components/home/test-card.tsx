import { AnswerOption } from "@/app/_components/answer-option";
import { ProgressBar } from "@/app/_components/progress-bar";
import { Blob3 } from "@/app/_components/svgs/blob-3";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { RadioGroup } from "@headlessui/react";

export const TestCard = () => (
  <div className="relative">
    <div className="w-full min-h-[360px] rounded-xl bg-linear-to-br from-baltic-blue-200 to-tuscan-sun-200 shadow-2xl p-6 flex flex-col justify-between text-white gap-5">
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
    <PositionedBlob className="w-80 h-80 top-[0%] opacity-50" align="right">
      <Blob3 />
    </PositionedBlob>
  </div>
);
