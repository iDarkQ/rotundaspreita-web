import { Study } from "@/app/generated/prisma/browser";
import { QuestionsStudiesEmpty } from "@/app/questions/[[...studyId]]/components/questions-studies/questions-studies-empty";
import { QuestionsStudiesListItem } from "@/app/questions/[[...studyId]]/components/questions-studies/questions-studies-list-item";

interface Props {
  studies: Study[];
  selectedStudy?: Study;
}

export const QuestionsStudiesList = ({ studies, selectedStudy }: Props) => (
  <div className="flex w-full flex-wrap items-center justify-center gap-2">
    {studies.length > 0 ? (
      studies.map((study) => (
        <QuestionsStudiesListItem
          key={study.id}
          id={study.id}
          title={study.title}
          selectedStudyId={selectedStudy?.id}
        />
      ))
    ) : (
      <QuestionsStudiesEmpty />
    )}
  </div>
);
