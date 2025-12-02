import { TestFeatureCard } from "@/app/_components/home/test-feature-card";
import { Tilt } from "@/app/_components/tilt";
import { PageTestMenu } from "@/app/panel/[[...studyId]]/page-test-menu";
import {
  fetchAllStudies,
  fetchAllStudyCategories,
} from "@/app/_services/study-service";
import { IoMdCheckbox } from "react-icons/io";

export const FeatureTestMenu = async () => {
  const studies = await fetchAllStudies();
  const foundStudy = studies[0];
  const categories = foundStudy
    ? await fetchAllStudyCategories(foundStudy.id)
    : [];

  return (
    <TestFeatureCard
      prefix={<IoMdCheckbox size={50} className="text-primary!" />}
      title="Testes de 30 minutos"
      description="Simule o ambiente de prova e melhore a sua gestão de tempo."
    >
      <Tilt className="w-full">
        <PageTestMenu
          studies={studies}
          categories={categories}
          defaultStudyId={studies[0]?.id}
          className="w-full flex! pointer-events-none"
        />
      </Tilt>
    </TestFeatureCard>
  );
};
