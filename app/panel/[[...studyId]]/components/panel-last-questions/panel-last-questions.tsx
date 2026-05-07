import { PanelLastQuestionsTitle } from "./panel-last-questions-title";
import { PanelLastQuestionsCard } from "./panel-last-questions-card";
import { PanelLastQuestionsItem } from "./panel-last-questions-item";
import { fetchLastTestResults } from "@/app/_services/test-results-service";

export const PanelLastQuestions = async () => {
  const lastQuestions = (await fetchLastTestResults()) ?? [];

  if (lastQuestions.length === 0) return;

  const correct = lastQuestions.filter((q) => q.answer === true).length;
  const wrong = lastQuestions.filter((q) => q.answer === false).length;
  const blank = lastQuestions.filter((q) => q.answer === undefined).length;

  return (
    lastQuestions.length > 0 && (
      <>
        <PanelLastQuestionsTitle />
        <PanelLastQuestionsCard correct={correct} wrong={wrong} blank={blank} />
        <div className="flex flex-col gap-2">
          {lastQuestions.map((v, i) => (
            <PanelLastQuestionsItem
              key={i}
              index={++i}
              question={v.question}
              answer={v.answer}
            />
          ))}
        </div>
      </>
    )
  );
};
