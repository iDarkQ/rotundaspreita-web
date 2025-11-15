import { Dialog } from "@/app/_components/dialog";
import { Text } from "@/app/_components/text";

interface Props {
  question: string;
  options: { option: string; label: string }[];
  onClose: () => void;
}

export const QuestionsDialog = ({ onClose, question, options }: Props) => {
  return (
    <Dialog onClose={onClose}>
      <Text as="h3">{question}</Text>
      <div className="flex flex-row gap-5  items-start justify-start">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col gap-1 items-start justify-center"
          >
            <Text as="h3">{option.option}</Text>
            <Text as="p">{option.label}</Text>
          </div>
        ))}
      </div>
    </Dialog>
  );
};
