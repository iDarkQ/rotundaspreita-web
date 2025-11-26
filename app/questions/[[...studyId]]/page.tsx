import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { fetchAllStudies } from "@/services/study-service";
import { QuestionsStudies } from "@/app/questions/[[...studyId]]/components/questions-studies";
import { QuestionsManage } from "@/app/questions/[[...studyId]]/components/questions-manage";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ studyId: string[] }>;
}

export default async function Test({ params }: Props) {
  const loadedParams = await params;
  const studyId = loadedParams.studyId?.[0];
  const studies = await fetchAllStudies();
  const user = await fetchLoggedUser();

  const foundStudy = studies?.find((s) => s.id === studyId);
  const selectedStudy = foundStudy ?? studies?.[0] ?? null;

  if(!user) {
    notFound();
  }
  
  return (
    <Section>
      <PositionedBlob align="left" className="w-100 h-100 top-[90%]">
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob align="right" className="w-100 h-100 top-[10%]">
        <Blob4 />
      </PositionedBlob>

      <Text as="h1">Todas as perguntas existentes</Text>

      <QuestionsStudies studies={studies ?? []} selectedStudy={selectedStudy ?? undefined} />
      
      <QuestionsManage studyId={selectedStudy?.id} user={user}/>
    </Section>
  );
}