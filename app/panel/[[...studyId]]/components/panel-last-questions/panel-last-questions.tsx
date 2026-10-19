import { Card } from "@/app/_components/card";
import { Chip } from "@/app/_components/chip";
import { Text } from "@/app/_components/text";
import { PanelLastQuestionsTitle } from "./panel-last-questions-title";
import { PanelLastQuestionsCard } from "./panel-last-questions-card";
import { PanelLastQuestionsItem } from "./panel-last-questions-item";
import { fetchLastTestResults } from "@/app/_services/test-results-service";
import { ReactNode } from "react";

export const PanelLastQuestions = async () => {
  const lastQuestions = (await fetchLastTestResults()) ?? [];

  if (lastQuestions.length === 0) return null;

  const correct = lastQuestions.filter((q) => q.answer === true).length;
  const wrong = lastQuestions.filter((q) => q.answer === false).length;
  const blank = lastQuestions.filter((q) => q.answer === undefined).length;
  const total = lastQuestions.length;

  return (
    <div
      aria-label="Resultados do último teste"
      className="flex w-full flex-col gap-5"
    >
      <PanelLastQuestionsTitle />
      <PanelLastQuestionsCard
        correct={correct}
        wrong={wrong}
        blank={blank}
        total={total}
      />
      <PanelLastQuestionsList count={total}>
        {lastQuestions.map((result, index) => (
          <PanelLastQuestionsItem
            key={index}
            index={index + 1}
            question={result.question}
            answer={result.answer}
          />
        ))}
      </PanelLastQuestionsList>
    </div>
  );
};

const PanelLastQuestionsList = ({
  count,
  children,
}: {
  count: number;
  children: ReactNode;
}) => (
  <Card className="w-full gap-0 overflow-hidden p-0!">
    <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
      <Text as="h3" className="text-lg! font-semibold!">
        Perguntas do último teste
      </Text>
      <Chip color="neutral" className="text-neutral shrink-0">
        {count} {count === 1 ? "questão" : "questões"}
      </Chip>
    </div>
    <ol className="divide-border border-border divide-y border-t">
      {children}
    </ol>
  </Card>
);
