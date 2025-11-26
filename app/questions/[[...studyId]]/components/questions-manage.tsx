import { Divider } from "@/app/_components/divider";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { User } from "@/app/generated/prisma/browser";
import { QuestionsCreator } from "@/app/questions/[[...studyId]]/components/questions-creator";
import { QuestionsList } from "@/app/questions/[[...studyId]]/components/questions-list";
import { ManageFetchedQuestionsProvider } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";
import {
  countAnsweredQuestions,
  findStudyQuestions,
} from "@/services/question-service";
import { fetchAllStudyCategories } from "@/services/study-service";

interface Props {
  user: User;
  studyId?: string;
}

export const QuestionsManage = async ({ user, studyId }: Props) => {
  if (!studyId) return;

  const questions = await findStudyQuestions(studyId);
  const responses = await countAnsweredQuestions();
  const categories = await fetchAllStudyCategories(studyId);

  return (
    <ManageFetchedQuestionsProvider questions={questions}>
      <Divider orientation="horizontal" />
      <div className="flex flex-col gap-2 w-full">
        {user.admin && (
          <QuestionsCreator selectedStudy={studyId} categories={categories} />
        )}
        <QuestionsList
          selectedStudy={studyId}
          responses={responses}
          categories={categories}
          user={user}
        />
      </div>
    </ManageFetchedQuestionsProvider>
  );
};
