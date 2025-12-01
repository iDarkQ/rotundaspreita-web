"use client";

import { ListBoxButton } from "@/app/_components/list-box/list-box-button";
import { ListBoxOption } from "@/app/_components/list-box/list-box-option";
import { ListBoxOptions } from "@/app/_components/list-box/list-box-options";
import { Text } from "@/app/_components/text";
import { useTestMenu } from "@/app/panel/[[...studyId]]/providers/test-menu";
import { Listbox } from "@headlessui/react";
import { MdArrowDownward, MdArrowForward } from "react-icons/md";

export const PanelSelectCategory = () => {
  const { selectedCategory, setSelectedCategory, listedCategories } =
    useTestMenu();

  if (listedCategories.length < 1) return;

  return (
    <>
      <div className="flex items-center justify-center max-md:hidden">
        <MdArrowForward size={20} className="text-primary!" />
      </div>
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <ListBoxButton className="w-full">{selectedCategory}</ListBoxButton>
        <ListBoxOptions anchor="bottom">
          {listedCategories.map((category) => (
            <ListBoxOption key={category} value={category}>
              <Text>{category}</Text>
            </ListBoxOption>
          ))}
        </ListBoxOptions>
      </Listbox>
    </>
  );
};
