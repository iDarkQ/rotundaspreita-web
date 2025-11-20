"use client";

import { QuestionsCard } from "@/app/questions/[[...studyId]]/components/questions-card";
import { useManageFetchedQuestions } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";

interface Props {
  selectedStudy: string;
}

export const QuestionsList = ({ selectedStudy }: Props) => {
  const { questions } = useManageFetchedQuestions();

  return (
    <div className="overflow-auto grid grid-cols-2 gap-5 w-full">
      {questions.map((q, index) => (
        <QuestionsCard
          key={q.id ?? index}
          question={q}
          selectedStudy={selectedStudy}
        />
      ))}
    </div>
  );
};
