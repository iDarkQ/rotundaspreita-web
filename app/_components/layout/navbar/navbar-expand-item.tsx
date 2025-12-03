"use client";

import { Button } from "@/app/_components/button";
import { NavbarItemsList } from "@/app/_components/layout/navbar/navbar-items-list/navbar-items-list";
import { useNavbarManager } from "@/app/_components/layout/navbar/providers/navbar-manager";
import clsx from "clsx";
import { MdClear, MdMenu } from "react-icons/md";

export const NavbarExpandItem = () => {
  const { expanded, setExpanded } = useNavbarManager();

  return (
    <>
      <div className="fixed top-0 right-0 z-10 flex h-(--navbar-height) items-center justify-center p-5">
        <Button
          variant="text"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex aspect-square h-full items-center justify-center lg:hidden"
          data-expanded={expanded}
        >
          {expanded ? (
            <MdClear size={30} className="text-primary!" />
          ) : (
            <MdMenu size={30} className="text-primary!" />
          )}
        </Button>
      </div>
      <div
        className={clsx(
          "fixed top-0 left-0 z-9 h-screen w-full bg-transparent backdrop-blur-lg transition-opacity lg:hidden",
          "flex items-center justify-center",
          !expanded && "pointer-events-none opacity-0",
          "**:text-5xl!",
        )}
      >
        <NavbarItemsList className="flex-col! items-center justify-center gap-10 max-lg:flex!" />
      </div>
    </>
  );
};
