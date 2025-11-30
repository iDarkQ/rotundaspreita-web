"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { QuestionCreatorDialog } from "@/app/questions/[[...studyId]]/components/dialogs/question-creator-dialog";
import { QuestionsImportDialog } from "@/app/questions/[[...studyId]]/components/dialogs/questions-import-dialog";
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

interface Props {
  selectedStudy: string;
  categories: string[];
}

export const QuestionsCreator = ({ selectedStudy, categories }: Props) => {
  const [open, setOpen] = useState(false);
  const [openImporter, setOpenImporter] = useState(false);

  return (
    <>
      {open && (
        <QuestionCreatorDialog
          categories={categories}
          selectedStudy={selectedStudy}
          onClose={() => setOpen(false)}
        />
      )}
      {openImporter && (
        <QuestionsImportDialog
          selectedStudy={selectedStudy}
          onClose={() => setOpenImporter(false)}
        />
      )}
      <div className="flex gap-2">
        <Button className="flex-1" onClick={() => setOpen(true)}>
          <Text className="text-white!">Criar Nova Pergunta</Text>
        </Button>
        <Button
          onClick={() => setOpenImporter(true)}
          className="flex gap-1 items-center justify-center"
        >
          <Text className="text-white!">
            Importar Perguntas Do Ficheiro Json
          </Text>
          <MdOutlineFileUpload size={20} className="text-white!" />
        </Button>
      </div>
    </>
  );
};
