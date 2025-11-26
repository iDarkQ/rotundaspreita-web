import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { MdAlarm } from "react-icons/md";
import { Text } from "@/app/_components/text";
import { Chip } from "@/app/_components/chip";
import { TestOptions } from "@/app/test/test-options";
import { fetchStudyById, generateTest } from "@/services/study-service";
import { Difficulty } from "@/types/difficulty";
import { TestManagerProvider } from "@/app/test/providers/test-manager";
import { TestCountdown } from "@/app/test/components/test-countdown";
import { redirect } from "next/navigation";
import { TestFinishButton } from "@/app/test/components/test-finish-button";
import { TestResults } from "@/app/test/components/test-results";
import { RouteNames } from "@/utils/route-names";

interface Props {
  searchParams?: Promise<{ s?: string; c?: string; d?: string }>;
}

export default async function Test({ searchParams }: Props) {
  const {
    s: selectedStudy,
    c: selectedCategory,
    d: rawDifficulty,
  } = (await searchParams) ?? {};

  const selectedDifficulty =
    rawDifficulty && rawDifficulty in Difficulty
      ? Difficulty[rawDifficulty as keyof typeof Difficulty]
      : undefined;

  const questions = await generateTest(selectedStudy, selectedDifficulty);

  if (!questions || questions.length < 1) {
    redirect(RouteNames.PANEL);
  }

  const firstQuestion = questions[0];
  const study = await fetchStudyById(firstQuestion.studyId);

  return (
    <TestManagerProvider questions={questions}>
      <Section>
        <PositionedBlob align="left" className="w-100 h-100 top-[70vh]">
          <Blob1 />
        </PositionedBlob>
        <PositionedBlob align="right" className="w-100 h-100 top-[-10vh]">
          <Blob4 />
        </PositionedBlob>
        <TestResults />
        <div className="flex gap-2 items-center justify-center">
          <Chip>
            <Text as="p" className="text-white">
              Teste de {study?.title}
              {firstQuestion.category === selectedCategory
                ? `(${selectedCategory})`
                : ""}
            </Text>
          </Chip>
          <div className="flex items-center justify-center gap-0.5">
            <TestCountdown />
            <MdAlarm className="text-primary" />
          </div>
        </div>

        <TestOptions />
        <TestFinishButton />
      </Section>
    </TestManagerProvider>
  );
}
