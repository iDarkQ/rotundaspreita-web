import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";
import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  prefix?: ReactNode;
  children?: ReactNode;
  align?: "left" | "right";
}

export const TestFeatureCard = ({
  title,
  description,
  prefix,
  align = "left",
  children,
}: Props) => (
  <div
    className={clsx(
      "flex flex-row gap-10",
      align === "left" && "flex-row-reverse"
    )}
  >
    <div className="flex w-full flex-3 justify-center items-center">
      {children}
    </div>
    <div
      className={clsx(
        "flex flex-col w-full flex-2 min-h-[30vh] justify-center items-center p-5"
      )}
    >
      {prefix}
      <Text as="h3">{title}</Text>
      <Text className="text-primary!">{description}</Text>
    </div>
  </div>
);
