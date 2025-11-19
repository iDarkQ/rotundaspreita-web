import { Divider } from "@/app/_components/divider";
import { RadioButton } from "@/app/_components/radio-button";
import { Text } from "@/app/_components/text";
import { Label } from "@headlessui/react";

interface Props {
  option: string;
  label: string;
  defaultValue?: string;
  onClick?: () => void;
  onDelete?: () => void;
  onChange?: (text: string) => void;
  selected?: boolean;
  editable?: boolean;
}

export const AnswerOption = ({
  option,
  label,
  defaultValue,
  onClick,
  onDelete,
  onChange,
  editable = false,
  selectable = true,
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
