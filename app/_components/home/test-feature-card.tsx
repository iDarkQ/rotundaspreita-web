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
      "flex flex-row gap-10 max-xl:flex-col-reverse max-xl:gap-2!",
      align === "left" && "flex-row-reverse max-xl:flex-col",
    )}
  >
    <div className="flex w-full flex-3 items-center justify-center">
      {children}
    </div>
    <div
      className={clsx(
        "flex min-h-[30vh] w-full flex-2 flex-col items-center justify-center p-5 max-xl:min-h-[20vh]!",
      )}
    >
      {prefix}
      <Text as="h3">{title}</Text>
      <Text className="text-primary!">{description}</Text>
    </div>
  </div>
);
