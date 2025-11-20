"use client";

import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { Study } from "@/app/generated/prisma/browser";
import { updateStudy } from "@/services/study-service";
import { useRef } from "react";

interface Props {
  onClose: () => void;
  study: Study;
}

export const StudyEditorDialog = ({ onClose, study }: Props) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const handleCreateStudy = async () => {
    if (!titleRef.current || !descriptionRef.current) return;

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    await updateStudy(study.id, title, description);
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="Editing Study">
      <Field>
        <Text as="label">Study Title</Text>
        <Input
          ref={titleRef}
          name="study_name"
          type="text"
          placeholder="Study title"
          className="w-full"
          defaultValue={study.title}
        />
      </Field>
      <Field>
        <Text as="label">Study Description</Text>
        <Input
          ref={descriptionRef}
          name="study_description"
          type="text"
          placeholder="Study Description"
          className="w-full"
          defaultValue={study.description}
        />
      </Field>
      <Button onClick={handleCreateStudy}>
        <Text className="text-white!">Confirm Changes</Text>
      </Button>
    </Dialog>
  );
};
