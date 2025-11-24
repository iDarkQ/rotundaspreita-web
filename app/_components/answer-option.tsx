"use client";

import { Divider } from "@/app/_components/divider";
import { Input } from "@/app/_components/input";
import { RadioButton } from "@/app/_components/radio-button";
import { Text } from "@/app/_components/text";
import { Label } from "@headlessui/react";
import clsx from "clsx";

interface Props {
  option: string;
  label: string;
  defaultValue?: string;
  onClick?: () => void;
  onDelete?: () => void;
  onChange?: (text: string) => void;
  selected?: boolean;
  selectable?: boolean;
  editable?: boolean;
  className?: string;
  labelClassName?: string;
  state?: "correct" | "wrong";
}

export const AnswerOption = ({
  option,
  label,
  defaultValue,
  onClick,
  onDelete,
  onChange,
  selected,
  state,
  className,
  labelClassName,
  editable = false,
  selectable = true,
}: Props) => (
  <RadioButton
    selected={selected}
    selectable={selectable}
    onClick={onClick}
    onDelete={onDelete}
    className={clsx(
      state === "correct" && "bg-success-bg!",
      state === "wrong" && "bg-error-bg!",
      className && className
    )}
  >
    <Text as="h2">{option}</Text>
    <Divider orientation="vertical" className=" self-stretch h-auto!" />
    {editable ? (
      <Input
        className="border-hidden! outline-hidden! w-full h-auto!"
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onChange={(e) => onChange?.(e.target.value)}
        defaultValue={defaultValue}
        placeholder="Clique e digite para escrever a resposta..."
      />
    ) : (
      <Label
        className={clsx(
          "text-base text-neutral flex-1 h-auto!",
          labelClassName && labelClassName
        )}
      >
        {label}
      </Label>
    )}
  </RadioButton>
);
