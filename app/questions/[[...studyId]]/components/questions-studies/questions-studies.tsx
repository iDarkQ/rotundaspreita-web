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
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <QuestionsStudiesList studies={studies} selectedStudy={study} />
      {user?.admin && (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <QuestionsStudiesCreate />
          <QuestionsStudiesEdit study={study} />
        </div>
      )}
    </div>
  );
};
