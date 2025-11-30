import { Divider } from "@/app/_components/divider";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { User } from "@/app/generated/prisma/browser";
import { QuestionsCreator } from "@/app/questions/[[...studyId]]/components/questions-creator";
import { QuestionsList } from "@/app/questions/[[...studyId]]/components/questions-list";
import { QuestionsSearchInput } from "@/app/questions/[[...studyId]]/components/questions-search-input";
import { ManageFetchedQuestionsProvider } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";
import {
  countAnsweredQuestions,
  searchForQuestions,
} from "@/services/question-service";
import { fetchAllStudyCategories } from "@/services/study-service";

interface Props {
  user: User;
  studyId?: string;
}

export const QuestionsManage = async ({ user, studyId }: Props) => {
  if (!studyId) return;

  const searchResults = await searchForQuestions(studyId);
  const responses = await countAnsweredQuestions();
  const categories = await fetchAllStudyCategories(studyId);

  return (
    <ManageFetchedQuestionsProvider questions={searchResults?.questions ?? []} selectedStudy={studyId} maxPages={searchResults?.maxPages ?? -1}>
      <Divider orientation="horizontal" />
      <div className="flex flex-col gap-2 w-full">
        {user.admin && (
          <QuestionsCreator selectedStudy={studyId} categories={categories} />
        )}
        <QuestionsSearchInput />
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
