import { Button } from "@/app/_components/button";
import { Card } from "@/app/_components/card";
import { Chip } from "@/app/_components/chip";
import { Text } from "@/app/_components/text";
import { MdCheckCircleOutline, MdQuestionMark } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";

interface PanelLastQuestionsItemProps {
  index: number;
  question?: string;
  answer?: boolean;
}

export const PanelLastQuestionsItem = ({
  index,
  question,
  answer,
}: PanelLastQuestionsItemProps) => {
  const unAnswered = answer === undefined;

  const answerMessage = unAnswered
    ? "Em Branco"
    : answer
      ? "Correto"
      : "Errado";

  const answerIcon = unAnswered ? (
    <MdQuestionMark />
  ) : answer ? (
    <MdCheckCircleOutline />
  ) : (
    <IoMdCloseCircleOutline />
  );

  return (
    <Card className="w-full flex-row gap-5">
      <div className="flex w-full flex-row items-center gap-2">
        <Chip
          square
          color={answer ? "success" : "error"}
          className={answer ? "text-success" : "text-error"}
        >
          {index}
        </Chip>
        <Text as="p">{question}</Text>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Chip color="neutral" className="text-neutral w-min whitespace-nowrap">
          {answerIcon}
          {answerMessage}
        </Chip>
        <Button
          variant="text"
          className="flex items-center justify-center text-center"
        >
          <MdArrowDropDown />
        </Button>
      </div>
    </Card>
  );
};
