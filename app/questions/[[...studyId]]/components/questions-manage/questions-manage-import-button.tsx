"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { QuestionsImportDialog } from "@/app/questions/[[...studyId]]/components/dialogs/questions-import-dialog";
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

export const QuestionsManageImportButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <QuestionsImportDialog onClose={() => setOpen(false)} />}
      <Button
        onClick={() => setOpen(true)}
        className="flex gap-1 items-center justify-center"
      >
        <Text className="text-white!">Importar Perguntas Do Ficheiro Json</Text>
        <MdOutlineFileUpload size={20} className="text-white!" />
      </Button>
    </>
  );
};
