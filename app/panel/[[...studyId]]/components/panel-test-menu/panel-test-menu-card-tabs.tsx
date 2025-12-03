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
      <TabList className="w-full">
        <Tab label="Todos" />
        <Tab label="Novos" />
        <Tab label="Difíceis" />
      </TabList>
    </TabGroup>
  );
};

/*

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
      <TabList className="w-full">
        <Tab label="Todos" />
        <Tab label="Novos" />
        <Tab label="Difíceis" />
      </TabList>
    </TabGroup>
  );
};


 */
