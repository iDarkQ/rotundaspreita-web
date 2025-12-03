"use client";

import { User } from "@/app/generated/prisma/browser";
import { QuestionsCard } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage-card";
import { QuestionsManageListEmpty } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage-list-empty";
import { QuestionsManageListMore } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage-list-more";
import { useInfiniteQuestionsList } from "@/app/questions/[[...studyId]]/hooks/use-infinte-questions-list";

interface Props {
  responses: { [key: string]: number };
  user: User;
}

export const QuestionsList = ({ responses, user }: Props) => {
  const { questions, bottomRef, finish, loading } = useInfiniteQuestionsList();

  return (
    <>
      {questions.length < 1 && <QuestionsManageListEmpty />}
      <div className="grid w-full grid-cols-2 gap-2 overflow-auto max-lg:grid-cols-1">
        {questions.map((q, index) => (
          <QuestionsCard
            key={q.id ?? index}
            question={q}
            answeredCount={responses[q.id]}
            user={user}
          />
        ))}
        <div ref={bottomRef} className="col-span-2 h-4 max-lg:col-span-1" />
      </div>

      {!finish && <QuestionsManageListMore loading={loading} />}
    </>
  );
};
