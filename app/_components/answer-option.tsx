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
      state === "wrong" && "bg-error-bg!"
    )}
  >
    <Text as="h2">{option}</Text>
    <Divider orientation="vertical" />
    {editable ? (
      <Input
        className="border-hidden! outline-hidden! w-full"
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onChange={(e) => onChange?.(e.target.value)}
        defaultValue={defaultValue}
        placeholder="Click and type to write answer..."
      />
    ) : (
      <Label className="text-base text-neutral flex-1">{label}</Label>
    )}
  </RadioButton>
);
