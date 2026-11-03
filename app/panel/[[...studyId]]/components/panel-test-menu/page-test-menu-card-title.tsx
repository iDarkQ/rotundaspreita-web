"use client";

import { Text } from "@/app/_components/text";
import { useTestQuestionCount } from "@/app/panel/[[...studyId]]/hooks/use-test-question-count";

export const PageTestMenuCardTitle = () => {
  const [questionCount] = useTestQuestionCount();

  return (
    <Text as="h2" className="font-normal!">
      Iniciar novo teste de {questionCount} minutos
    </Text>
  );
};
