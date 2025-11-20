"use client";

import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { createStudy } from "@/services/study-service";
import { Field } from "@headlessui/react";
import { useRef } from "react";

interface Props {
  onClose: () => void;
}

export const StudyCreatorDialog = ({ onClose }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleCreateStudy = async () => {
    if (!inputRef.current) return;

    const title = inputRef.current.value;

    await createStudy(title, "Lorem ipsum sit dolor amet");
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="Create New Study">
      <Field>
        <Text as="label">Study Title</Text>
        <Input
          ref={inputRef}
          name="study_name"
          type="text"
          placeholder="Study title"
          className="w-full"
        />
      </Field>
      <Button onClick={handleCreateStudy}>
        <Text className="text-white!">Create</Text>
      </Button>
    </Dialog>
  );
};
