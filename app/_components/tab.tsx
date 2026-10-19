"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { Tab as HeadlessUITab } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
  className?: string;
  icon?: ReactNode;
  label: string;
}

export const Tab = ({ className, icon, label }: Props) => (
  <HeadlessUITab as={Fragment}>
    {({ selected }) => (
      <Button
        variant={selected ? "contained" : "outlined"}
        className={clsx(
          "group flex-1 shadow-lg outline-0",
          className && className,
        )}
      >
        <Text
          as="span"
          className="inline-flex items-center justify-center gap-2 group-data-selected:text-white!"
        >
          {icon}
          {label}
        </Text>
      </Button>
    )}
  </HeadlessUITab>
);
