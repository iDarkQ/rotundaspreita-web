import { Divider } from "@/app/_components/divider";
import { PaginationItem } from "@/app/_components/pagination/pagination-item";
import { useTestManager } from "@/app/test/providers/test-manager";
import clsx from "clsx";

interface Props {
  page: number;
}

export const QuestionsPagination = ({ page }: Props) => {
  const { questions, setSelectedPage, answers, correctAnswers, finished } =
    useTestManager();

  const count = questions.length;

  return (
    <div className="flex flex-row w-full justify-center overflow-hidden gap-1">
      <PaginationItem
        type="previous"
        disabled={page <= 1}
        onClick={() => setSelectedPage(questions[page - 2]?.id)}
      />
      <Divider orientation="vertical" />

      <div className="flex flex-row overflow-auto gap-1">
        {questions.map((q, index) => (
          <PaginationItem
            key={index + 1}
            page={index + 1}
            selected={index + 1 === page || (!finished && !!answers[q.id])}
            onClick={() => setSelectedPage(q.id)}
            className={clsx(
              finished &&
                (answers[q.id] === correctAnswers[q.id]
                  ? "bg-success-bg"
                  : "bg-error-bg")
            )}
          />
        ))}
      </div>
      <Divider orientation="vertical" />

      <PaginationItem
        type="next"
        onClick={() => setSelectedPage(questions[page]?.id)}
        disabled={page >= count}
      />
    </div>
  );
};
