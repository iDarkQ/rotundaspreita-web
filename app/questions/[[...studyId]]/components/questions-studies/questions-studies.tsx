import { Study } from "@/app/generated/prisma/browser";
import { QuestionsStudiesCreate } from "@/app/questions/[[...studyId]]/components/questions-studies/questions-studies-create";
import { QuestionsStudiesEdit } from "@/app/questions/[[...studyId]]/components/questions-studies/questions-studies-edit";
import { QuestionsStudiesList } from "@/app/questions/[[...studyId]]/components/questions-studies/questions-studies-list";
import { fetchAllStudies } from "@/app/_services/study-service";
import { verifySession } from "@/app/_services/user-service";

interface Props {
  study?: Study;
}

export const QuestionsStudies = async ({ study }: Props) => {
  const user = await verifySession();
  const studies = await fetchAllStudies();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <QuestionsStudiesList studies={studies} selectedStudy={study} />
      {user?.admin && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <QuestionsStudiesCreate />
          <QuestionsStudiesEdit study={study} />
        </div>
      )}
    </div>
  );
};
