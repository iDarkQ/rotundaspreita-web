"use client";

import { Tab } from "@/app/_components/tab";
import { TabList } from "@/app/_components/tab-list";
import { useTestMenu } from "@/app/panel/[[...studyId]]/providers/test-menu";
import { Difficulty } from "@/app/_types/difficulty";
import { TabGroup } from "@headlessui/react";

export const PanelTabs = () => {
  const { setDifficulty } = useTestMenu();

  return (
    <TabGroup
      onChange={(index) => {
        const difficulties = Object.values(Difficulty);
        setDifficulty(difficulties[index]);
      }}
    >
      <TabList className="w-full">
        <Tab label="Todos" />
        <Tab label="Novos" />
        <Tab label="Difíceis" />
      </TabList>
    </TabGroup>
  );
};
