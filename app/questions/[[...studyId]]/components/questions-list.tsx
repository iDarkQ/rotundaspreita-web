"use client";

import { Banner } from "@/app/_components/banner";
import { Text } from "@/app/_components/text";
import { User } from "@/app/generated/prisma/browser";
import { QuestionsCard } from "@/app/questions/[[...studyId]]/components/questions-card";
import { useManageFetchedQuestions } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";

interface Props {
  selectedStudy: string;
  responses: { [key: string]: number };
  categories: string[];
  user: User;
}

export const QuestionsList = ({
  selectedStudy,
  responses,
  categories,
  user,
}: Props) => {
  const { questions } = useManageFetchedQuestions();

  return (
    <>
      {questions.length < 1 && (
        <Banner center className="w-full">
          <Text>Não há questoes neste momento</Text>
        </Banner>
      )}
      <div className="overflow-auto grid grid-cols-2 gap-2 w-full">
        {questions.map((q, index) => (
          <QuestionsCard
            key={q.id ?? index}
            question={q}
            selectedStudy={selectedStudy}
            answeredCount={responses[q.id]}
            categories={categories}
            user={user}
          />
        ))}
      </div>
    </>
  );
};
