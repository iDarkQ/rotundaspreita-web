"use client";

import { Tab } from "@/app/_components/tab";
import { TabList } from "@/app/_components/tab-list";
import { useTestMenu } from "@/app/panel/[[...studyId]]/providers/test-menu";
import { Difficulty } from "@/app/_types/difficulty";
import { TabGroup } from "@headlessui/react";

export const PanelTestMenuCardTabs = () => {
  const { setDifficulty } = useTestMenu();

  const handleOnChange = (index: number) => {
    const difficulties = Object.values(Difficulty);
    setDifficulty(difficulties[index]);
  };

  return (
    <TabGroup onChange={handleOnChange}>
      <TabList className="flex w-full flex-wrap gap-2">
        <Tab label="Todos" className="min-w-[100px]" />
        <Tab label="Novos" className="min-w-[100px]" />
        <Tab label="Difíceis" className="min-w-[100px]" />
        <Tab label="Errados" className="min-w-[100px]" />
      </TabList>
    </TabGroup>
  );
};
