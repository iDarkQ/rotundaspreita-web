"use client";

import { Chip } from "@/app/_components/chip";
import { Text } from "@/app/_components/text";
import { Study } from "@/app/generated/prisma/browser";
import { StudyDialog } from "@/app/questions/[[...studyId]]/components/dialogs/study-dialog";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

interface Props {
  study?: Study;
}

export const QuestionsStudiesEdit = ({ study }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <StudyDialog onClose={() => setIsOpen(false)} study={study} />}
      <Chip variant="outlined" onClick={() => setIsOpen(true)}>
        <Text as="p">Editar Estudo Selecionado</Text>
        <MdModeEdit className="text-neutral" />
      </Chip>
    </>
  );
};
