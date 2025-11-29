"use client";

import { NavbarSettingsButton } from "@/app/_components/layout/navbar/navbar-items-list/navbar-settings-button";
import { NavbarSettingsDialog } from "@/app/_components/layout/navbar/navbar-items-list/navbar-settings-dialog";
import { useState } from "react";

export const NavbarSettingsItem = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <NavbarSettingsButton onClick={() => setOpen(true)} />
      {open && <NavbarSettingsDialog onClose={() => setOpen(false)} />}
    </>
  );
};
