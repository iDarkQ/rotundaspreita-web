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
      <div className="flex justify-center items-center right-0 top-0 fixed z-10 p-5 h-(--navbar-height)">
        <Button
          variant="text"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex justify-center items-center aspect-square h-full lg:hidden"
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
          "top-0 left-0 bg-transparent fixed h-screen w-full z-9 backdrop-blur-lg transition-opacity lg:hidden",
          "flex items-center justify-center",
          !expanded && "opacity-0 pointer-events-none",
          "**:text-5xl!"
        )}
      >
        <NavbarItemsList className="flex-col! items-center justify-center gap-10 max-lg:flex!" />
      </div>
    </>
  );
};
