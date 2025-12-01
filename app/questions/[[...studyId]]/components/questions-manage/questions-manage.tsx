import { QuestionsManageActions } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage-actions";
import { QuestionsList } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage-list";
import { QuestionsManageSearchInput } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage-search-input";
import { ManageFetchedQuestionsProvider } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";
import {
  countAnsweredQuestions,
  searchForQuestions,
} from "@/services/question-service";
import { verifySession } from "@/services/user-service";
import { Study } from "@/app/generated/prisma/browser";

interface Props {
  study: Study;
}

export const QuestionsManage = async ({ study }: Props) => {
  const session = await verifySession();

  const searchResults = await searchForQuestions(study.id);
  const responses = await countAnsweredQuestions();

  return (
    <div className="flex flex-col gap-2 w-full">
      <ManageFetchedQuestionsProvider
        questions={searchResults?.questions ?? []}
        maxPages={searchResults?.maxPages ?? -1}
      >
        {session.admin && <QuestionsManageActions />}
        <QuestionsManageSearchInput />
        <QuestionsList
          responses={responses}
          user={session}
        />
      </ManageFetchedQuestionsProvider>
    </div>
  );
};
