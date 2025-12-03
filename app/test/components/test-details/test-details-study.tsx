import { Chip } from "@/app/_components/chip";
import { Text } from "@/app/_components/text";
import { QuestionWithOptionsNoAnswer } from "@/app/_types/question-with-options-no-answer";
import { Study } from "@/app/generated/prisma/client";

interface Props {
  study: Study | null;
  firstQuestion: QuestionWithOptionsNoAnswer;
  selectedCategory?: string;
}

export const TestDetailsStudy = ({
  study,
  firstQuestion,
  selectedCategory,
}: Props) => (
  <Chip>
    <Text as="p" className="text-white">
      Teste de {study?.title}
      {firstQuestion.category === selectedCategory
        ? `(${selectedCategory})`
        : ""}
    </Text>
  </Chip>
);
