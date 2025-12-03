"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { Tab as HeadlessUITab } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";

interface Props {
  className?: string;
  label: string;
}

export const Tab = ({ className, label }: Props) => (
  <HeadlessUITab as={Fragment}>
    {({ selected }) => (
      <Button
        variant={selected ? "contained" : "outlined"}
        className={clsx(
          "group flex-1 shadow-lg outline-0",
          className && className,
        )}
      >
        <Text as="p" className="group-data-selected:text-white!">
          {label}
        </Text>
      </Button>
    )}
  </HeadlessUITab>
);
