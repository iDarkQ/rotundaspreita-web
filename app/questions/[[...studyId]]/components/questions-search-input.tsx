"use client";

import { Input } from "@/app/_components/input";
import { useManageFetchedQuestions } from "@/app/questions/[[...studyId]]/providers/manage-fetched-questions";

export const QuestionsSearchInput = () => {
  const { inputRef } = useManageFetchedQuestions();
  return <Input ref={inputRef} placeholder="Pesquise uma pergunta..." />;
};
