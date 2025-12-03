import { Section } from "@/app/_components/section";
import { QuestionsStudies } from "@/app/questions/[[...studyId]]/components/questions-studies/questions-studies";
import { QuestionsManage } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage";
import {
  fetchAllStudyCategories,
  fetchStudyByIdOrReturnFirst,
} from "@/app/_services/study-service";
import { ManageSelectedStudyProvider } from "@/app/questions/[[...studyId]]/providers/manage-selected-study";
import { Divider } from "@/app/_components/divider";
import { QuestionsBlobs } from "@/app/questions/[[...studyId]]/components/questions-blobs";
import { QuestionsTitle } from "@/app/questions/[[...studyId]]/components/questions-title";

interface Props {
  params: Promise<{ studyId: string[] }>;
}

export default async function Questions({ params }: Props) {
  const loadedParams = await params;
  const studyId = loadedParams.studyId?.[0];

  const selectedStudy = await fetchStudyByIdOrReturnFirst(studyId);
  const categories = selectedStudy
    ? await fetchAllStudyCategories(selectedStudy.id)
    : [];

  return (
    <Section>
      <QuestionsBlobs />
      <QuestionsTitle />

      <QuestionsStudies study={selectedStudy} />
      {selectedStudy && (
        <ManageSelectedStudyProvider
          study={selectedStudy}
          categories={categories}
        >
          <Divider orientation="horizontal" />
          <QuestionsManage study={selectedStudy} />
        </ManageSelectedStudyProvider>
      )}
    </Section>
  );
}
