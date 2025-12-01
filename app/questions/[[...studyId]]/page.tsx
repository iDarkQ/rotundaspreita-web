import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { QuestionsStudies } from "@/app/questions/[[...studyId]]/components/questions-studies/questions-studies";
import { QuestionsManage } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage";
import {
  fetchAllStudyCategories,
  fetchStudyByIdOrReturnFirst,
} from "@/services/study-service";
import { ManageSelectedStudyProvider } from "@/app/questions/[[...studyId]]/providers/manage-selected-study";
import { Divider } from "@/app/_components/divider";

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
      <PositionedBlob
        align="left"
        className="w-100 h-100 top-[90vh] opacity-50"
      >
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob
        align="right"
        className="w-100 h-100 top-[10vh] opacity-50"
      >
        <Blob4 />
      </PositionedBlob>

      <Text as="h1" className="z-1" center>Todas as perguntas existentes</Text>

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
