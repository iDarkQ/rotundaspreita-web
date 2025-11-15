import { Button } from "@/app/_components/button";
import { Tab } from "@/app/_components/tab";
import { TabList } from "@/app/_components/tab-list";
import { Text } from "@/app/_components/text";
import { TabGroup } from "@headlessui/react";

export const PanelTabs = () => (
  <TabGroup>
    <TabList className="w-full">
      <Tab label="All" />
      <Tab label="New" />
      <Tab label="Struggled" />
    </TabList>
  </TabGroup>
);
