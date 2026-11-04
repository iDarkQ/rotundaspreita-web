"use client";

import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Divider } from "@/app/_components/divider";
import { NavbarSettingsProfile } from "@/app/_components/layout/navbar/navbar-items-list/navbar-settings-profile";
import { NavbarSettingsSubscription } from "@/app/_components/layout/navbar/navbar-items-list/navbar-settings-subscription";
import { logoutUser } from "@/app/_components/layout/navbar/server/logout";
import { Tab } from "@/app/_components/tab";
import { TabList } from "@/app/_components/tab-list";
import { Text } from "@/app/_components/text";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";

interface Props {
  onClose: () => void;
}

export const NavbarSettingsDialog = ({ onClose }: Props) => (
  <Dialog open={true} title="Definições Do Perfil" onClose={onClose}>
    <TabGroup className="flex flex-col gap-5">
      <DialogPart>
        <TabList>
          <Tab label="Perfil" />
          <Tab label="Subscrição" />
        </TabList>
      </DialogPart>
      <TabPanels>
        <DialogPart>
          <TabPanel>
            <NavbarSettingsProfile />
          </TabPanel>
          <TabPanel>
            <NavbarSettingsSubscription />
          </TabPanel>
        </DialogPart>
      </TabPanels>
    </TabGroup>
    <Divider />
    <DialogPart>
      <Button variant="contained" onClick={logoutUser}>
        <Text className="text-white!">Encerrar Sessão</Text>
      </Button>
    </DialogPart>
  </Dialog>
);
