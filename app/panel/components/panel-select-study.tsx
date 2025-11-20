"use client";

import { ListBoxButton } from "@/app/_components/list-box/list-box-button";
import { ListBoxOption } from "@/app/_components/list-box/list-box-option";
import { ListBoxOptions } from "@/app/_components/list-box/list-box-options";
import { Text } from "@/app/_components/text";
import { useTestMenu } from "@/app/panel/providers/test-menu";
import { Listbox } from "@headlessui/react";

export const PanelSelectStudy = () => {
  const { selectedStudyId, selectedStudy, setSelectedStudyId, studies } =
    useTestMenu();

  return (
    <Listbox value={selectedStudyId} onChange={setSelectedStudyId}>
      <ListBoxButton className="w-full">{selectedStudy?.title}</ListBoxButton>
      <ListBoxOptions anchor="bottom">
        {studies.map((study) => (
          <ListBoxOption key={study.title} value={study.id}>
            <Text>{study.title}</Text>
          </ListBoxOption>
        ))}
      </ListBoxOptions>
    </Listbox>
  );
};
