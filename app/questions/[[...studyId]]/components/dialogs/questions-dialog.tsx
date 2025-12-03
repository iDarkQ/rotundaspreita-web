import { Dialog } from "@/app/_components/dialog/dialog";
import { Text } from "@/app/_components/text";
import { Option } from "@/app/generated/prisma/browser";

interface Props {
  question: string;
  options: Option[];
  onClose: () => void;
}

export const QuestionsDialog = ({ onClose, question, options }: Props) => {
  return (
    <Dialog onClose={onClose} title={question}>
      <div className="flex flex-row items-start justify-start gap-5">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-start justify-center gap-1"
          >
            <Text as="h3">{option.letter}</Text>
            <Text as="p">{option.content}</Text>
          </div>
        ))}
      </div>
    </Dialog>
  );
};
