import { AnswerOption } from "@/app/_components/answer-option";
import { TestFeatureCard } from "@/app/_components/home/test-feature-card";
import { Tilt } from "@/app/_components/tilt";
import { PageTestMenu } from "@/app/panel/[[...studyId]]/page-test-menu";
import {
  fetchAllStudies,
  fetchAllStudyCategories,
} from "@/services/study-service";
import { RadioGroup } from "@headlessui/react";
import { IoMdListBox } from "react-icons/io";

export const FeatureManyQuestions = async () => {
  const studies = await fetchAllStudies();
  const foundStudy = studies[0];
  const categories = foundStudy
    ? await fetchAllStudyCategories(foundStudy.id)
    : [];

  return (
    <TestFeatureCard
      prefix={<IoMdListBox size={50} className="text-primary!" />}
      title="600+ Questões"
      description="Simule o ambiente de prova e melhore a sua gestão de tempo."
      align="right"
    >
      <Tilt angle="right" className="w-[80%]">
        <RadioGroup className="flex flex-col gap-2 relative w-full h-min">
          <AnswerOption
            label="ROTUNDÁSPREITA tem perguntas apenas para instrutores"
            option="A"
            selectable={false}
            className="absolute! -top-10 -right-10 w-full"
          />
          <AnswerOption
            label="ROTUNDÁSPREITA tem perguntas apenas para diretores"
            option="B"
            selectable={false}
          />

          <AnswerOption
            label="ROTUNDÁSPREITA tem perguntas para instrutores e diretores"
            option="C"
            selectable={false}
            selected={true}
            className="absolute! bg-tuscan-sun-100! top-10 right-10 w-full"
          />
        </RadioGroup>
      </Tilt>
    </TestFeatureCard>
  );
};
