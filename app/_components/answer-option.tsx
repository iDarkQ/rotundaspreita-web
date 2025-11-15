import { Divider } from "@/app/_components/divider";
import { RadioButton } from "@/app/_components/radio-button";
import { Text } from "@/app/_components/text";
import { Label } from "@headlessui/react";

interface Props {
  option: string;
  label: string;
  onClick?: () => void;
  selected?: boolean;
}

export const AnswerOption = ({ option, label, onClick, selected }: Props) => (
  <RadioButton value={label} selected={selected} onClick={onClick}>
    <Text as="h2">{option}</Text>
    <Divider orientation="vertical" />
    <Label className="text-base text-neutral flex-1">{label}</Label>
  </RadioButton>
);

/* 


export const AnswerOption = ({ option, label, selected }: Props) => (
  <Field className="flex items-center gap-2 c-border p-3">
    <Text as="h2">{option}</Text>
    <Divider orientation="vertical" />
    <Label className="text-base text-neutral flex-1">{label}</Label>
  </Field>
);


*/
