"use client";

import { Chip } from "@/app/_components/chip";
import { Text } from "@/app/_components/text";
import { StudyDialog } from "@/app/questions/[[...studyId]]/components/dialogs/study-dialog";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

export const QuestionsStudiesCreate = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <StudyDialog onClose={() => setIsOpen(false)} />}
      <Chip variant="outlined" onClick={() => setIsOpen(true)}>
        <Text as="p">Criar Estudo</Text>
        <IoMdAddCircleOutline className="text-neutral" />
      </Chip>
    </>
  );
};
