"use client";

import { Divider } from "@/app/_components/divider";
import { Input } from "@/app/_components/input";
import { RadioButton } from "@/app/_components/radio-button";
import { Text } from "@/app/_components/text";
import { Label } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent } from "react";

interface Props {
  option: string;
  label: string;
  defaultValue?: string;
  onClick?: () => void;
  onDelete?: () => void;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  value,
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
      className && className,
    )}
  >
    <Text as="h2">{option}</Text>
    <Divider orientation="vertical" className="h-auto! self-stretch" />
    {editable ? (
      <Input
        className="h-auto! w-full border-hidden! outline-hidden!"
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        placeholder="Clique e digite para escrever a resposta..."
      />
    ) : (
      <Label
        className={clsx(
          "text-neutral h-auto! flex-1 text-base",
          labelClassName && labelClassName,
        )}
      >
        {label}
      </Label>
    )}
  </RadioButton>
);
