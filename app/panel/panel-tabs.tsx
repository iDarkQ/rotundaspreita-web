"use client";

import { Tab } from "@/app/_components/tab";
import { TabList } from "@/app/_components/tab-list";
import { useTestMenu } from "@/app/panel/providers/test-menu";
import { TabGroup } from "@headlessui/react";

export const PanelTabs = () => {
  const { setDifficulty } = useTestMenu();

  return (
    <TabGroup onChange={setDifficulty}>
      <TabList className="w-full">
        <Tab label="Todos" />
        <Tab label="Novos" />
        <Tab label="Difíceis" />
      </TabList>
    </TabGroup>
  );
};
