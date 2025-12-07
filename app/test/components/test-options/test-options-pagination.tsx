import { Divider } from "@/app/_components/divider";
import { PaginationItem } from "@/app/_components/pagination/pagination-item";
import { useTestManager } from "@/app/test/providers/test-manager";

interface Props {
  page: number;
}

export const TestOptionsPagination = ({ page }: Props) => {
  const {
    questions,
    updateSelectedQuestion,
    answers,
    correctAnswers,
    finished,
  } = useTestManager();

  const count = questions.length;

  return (
    <div className="z-1 flex w-full flex-row justify-center gap-1 overflow-hidden">
      <PaginationItem
        type="previous"
        disabled={page <= 1}
        onClick={() => updateSelectedQuestion(questions[page - 2]?.id)}
      />
      <Divider orientation="vertical" />

      <div className="flex flex-row gap-1 overflow-auto">
        {questions.map((q, index) => {
          const color = finished
            ? answers[q.id] !== correctAnswers[q.id]
              ? "error"
              : "success"
            : "default";

          return (
            <PaginationItem
              key={index + 1}
              page={index + 1}
              selected={index + 1 === page || (!finished && !!answers[q.id])}
              onClick={() => updateSelectedQuestion(q.id)}
              color={color}
            />
          );
        })}
      </div>
      <Divider orientation="vertical" />

      <PaginationItem
        type="next"
        onClick={() => updateSelectedQuestion(questions[page]?.id)}
        disabled={page >= count}
      />
    </div>
  );
};
