import { ListBoxButton } from "@/app/_components/list-box/list-box-button";
import { ListBoxOption } from "@/app/_components/list-box/list-box-option";
import { ListBoxOptions } from "@/app/_components/list-box/list-box-options";
import { Text } from "@/app/_components/text";
import { Study } from "@/app/generated/prisma/browser";
import { RouteNames } from "@/utils/route-names";
import { Listbox } from "@headlessui/react";
import { redirect } from "next/navigation";

interface Props {
  studies: Study[];
  selectedStudyId: string;
}

export const PanelSelectStudy = ({ selectedStudyId, studies }: Props) => {
  const selectedStudy = studies.find((s) => s.id === selectedStudyId);
  
  const handleOnChange = async (value: string) => {
    redirect(RouteNames.PANEL + "/" + value);
  };

  return (
    <Listbox value={selectedStudyId} onChange={handleOnChange}>
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
