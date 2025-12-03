import { QuestionWithOptionsNoAnswer } from "@/app/_types/question-with-options-no-answer";
import { Study } from "@/app/generated/prisma/browser";
import { TestDetailsCountdown } from "@/app/test/components/test-details/test-details-countdown";
import { TestDetailsStudy } from "@/app/test/components/test-details/test-details-study";
import { MdAlarm } from "react-icons/md";

interface Props {
  study: Study | null;
  firstQuestion: QuestionWithOptionsNoAnswer;
  selectedCategory?: string;
}

export const TestDetails = ({
  study,
  firstQuestion,
  selectedCategory,
}: Props) => (
  <div className="flex items-center justify-center gap-2">
    <TestDetailsStudy
      study={study}
      firstQuestion={firstQuestion}
      selectedCategory={selectedCategory}
    />
    <div className="flex items-center justify-center gap-0.5">
      <TestDetailsCountdown />
      <MdAlarm className="text-primary" />
    </div>
  </div>
);
