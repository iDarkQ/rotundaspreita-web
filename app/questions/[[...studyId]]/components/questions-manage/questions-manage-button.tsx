"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { QuestionManagerDialog } from "@/app/questions/[[...studyId]]/components/dialogs/question-manager-dialog";
import { useState } from "react";

export const QuestionsManageButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <QuestionManagerDialog onClose={() => setOpen(false)} />}
      <Button className="flex-1" onClick={() => setOpen(true)}>
        <Text className="text-white!">Criar Nova Pergunta</Text>
      </Button>
    </>
  );
};
