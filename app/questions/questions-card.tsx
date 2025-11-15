import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";
import { useRipple } from "@/app/_hooks/use-ripple";
import { QuestionsDialog } from "@/app/questions/questions-dialog";
import { Button } from "@headlessui/react";
import { RefObject, useState } from "react";

interface Props {
  question: string;
  options: { option: string; label: string }[];
}

export const QuestionsCard = ({ question, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { events, cancel, ref } = useRipple();
  return (
    <>
      <Card
        ref={ref as RefObject<HTMLDivElement | null>}
        onMouseLeave={cancel}
        onPointerDown={events}
        onPointerUp={events}
        onClick={(e) => {
          events(e);
          setIsOpen((prev) => !prev);
        }}
        className="cursor-pointer relative c-border flex flex-col gap-2 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-5 bg-primary flex items-center justify-center">
          <Text as="p" className="text-white!">
            Already Answered 2 times
          </Text>
        </div>
        <div className="flex flex-col p-5">
          <Text as="h2">{question}</Text>

          {/* <div className="flex flex-row gap-5">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 items-center justify-center"
            >
              <Text as="h3">{option.option}</Text>
              <Text as="p" className="text-justify">
                {option.label}
              </Text>
            </div>
          ))}
        </div> */}
        </div>
      </Card>
      {isOpen && (
        <QuestionsDialog
          question={question}
          options={options}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
