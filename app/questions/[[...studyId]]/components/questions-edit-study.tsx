"use client";

import { Chip } from "@/app/_components/chip";
import { Text } from "@/app/_components/text";
import { Study } from "@/app/generated/prisma/browser";
import { StudyEditorDialog } from "@/app/questions/[[...studyId]]/components/dialogs/study-editor-dialog";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

interface Props {
  study: Study;
}

export const QuestionsEditStudy = ({ study }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <StudyEditorDialog onClose={() => setIsOpen(false)} study={study} />
      )}
      <Chip variant="outlined" onClick={() => setIsOpen(true)}>
        <Text as="p">Editar Estudo Selecionado</Text>
        <IoMdAddCircleOutline className="text-neutral" />
      </Chip>
    </>
  );
};
