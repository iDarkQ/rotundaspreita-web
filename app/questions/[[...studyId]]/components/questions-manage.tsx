import { QuestionsCreator } from "@/app/questions/[[...studyId]]/components/questions-creator";
import { QuestionsList } from "@/app/questions/[[...studyId]]/components/questions-list";
import { ManageFetchedQuestionsProvider } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";
import { findStudyQuestions } from "@/services/question-service";

interface Props {
  studyId?: string;
}

export const QuestionsManage = async ({ studyId }: Props) => {
  if (!studyId) return;

  const questions = await findStudyQuestions(studyId);

  return (
    <ManageFetchedQuestionsProvider questions={questions}>
      <QuestionsCreator selectedStudy={studyId} />
      <QuestionsList selectedStudy={studyId} />
    </ManageFetchedQuestionsProvider>
  );
};
