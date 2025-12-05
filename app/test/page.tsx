import { Section } from "@/app/_components/section";
import { TestOptions } from "@/app/test/components/test-options/test-options";
import { fetchStudyById, generateTest } from "@/app/_services/study-service";
import { Difficulty } from "@/app/_types/difficulty";
import { TestManagerProvider } from "@/app/test/providers/test-manager";
import { redirect } from "next/navigation";
import { TestFinishButton } from "@/app/test/components/test-finish-button";
import { TestResults } from "@/app/test/components/test-results";
import { RouteNames } from "@/app/_utils/route-names";
import { TestBlobs } from "@/app/test/components/test-blobs";
import { TestDetails } from "@/app/test/components/test-details/test-details";
import { LogAnalytics } from "@/app/_components/log-analytics";

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

  const questions = await generateTest(
    selectedStudy,
    selectedDifficulty,
    selectedCategory,
  );

  if (!questions || questions.length < 1) {
    redirect(RouteNames.PANEL);
  }

  const firstQuestion = questions[0];
  const study = await fetchStudyById(firstQuestion.studyId);

  return (
    <>
      <TestManagerProvider questions={questions}>
        <Section>
          <TestBlobs />
          <TestResults
            studyTitle={study?.title}
            category={selectedCategory}
            difficulty={selectedDifficulty}
          />
          <TestDetails
            study={study}
            firstQuestion={firstQuestion}
            selectedCategory={selectedCategory}
          />

          <TestOptions />
          <TestFinishButton />
        </Section>
      </TestManagerProvider>
      <LogAnalytics
        eventName="start_new_test"
        eventParams={{
          study: study?.title,
          category: selectedCategory,
          difficulty: selectedDifficulty,
        }}
      />
    </>
  );
}
