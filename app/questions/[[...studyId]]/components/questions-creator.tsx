"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { QuestionCreatorDialog } from "@/app/questions/[[...studyId]]/components/dialogs/question-creator-dialog";
import { useState } from "react";

interface Props {
  selectedStudy: string;
  categories: string[];
}

export const QuestionsCreator = ({ selectedStudy, categories }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <QuestionCreatorDialog
          categories={categories}
          selectedStudy={selectedStudy}
          onClose={() => setOpen(false)}
        />
      )}
      <Button className="w-full" onClick={() => setOpen(true)}>
        <Text className="text-white!">Criar Nova Pergunta</Text>
      </Button>
    </>
  );
};
