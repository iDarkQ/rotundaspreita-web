"use client";

import { QuestionsPagination } from "@/app/_components/questions-pagination";
import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { useState } from "react";
import { MdHourglassTop } from "react-icons/md";
import { Text } from "@/app/_components/text";
import { data, TestOptions } from "@/app/test/test-options";
import { Divider } from "@/app/_components/divider";
import { Chip } from "@/app/_components/chip";
import { Button } from "@/app/_components/button";
import { QuestionsCard } from "@/app/questions/questions-card";

export default function Test() {
  const [selected, setSelected] = useState<number>(1);

  return (
    <Section>
      <PositionedBlob align="left" className="w-100 h-100 top-[90%]">
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob align="right" className="w-100 h-100 top-[10%]">
        <Blob4 />
      </PositionedBlob>
      <div className="flex gap-2 items-center justify-center">
        <Chip>
          <Text as="p" className="text-white">
            Teste de diretor
          </Text>
        </Chip>
      </div>
      <Text as="h1">All Existing Questions</Text>
      <Divider orientation="horizontal" />
      <div className="overflow-auto grid grid-cols-2 gap-5">
        {data.map((q, index) => (
          <QuestionsCard
            key={q.question ?? index}
            question={q.question}
            options={q.options}
          />
        ))}
      </div>
    </Section>
  );
}
