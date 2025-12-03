import { AnswerOption } from "@/app/_components/answer-option";
import { OptionNoAnswer } from "@/app/_types/option-no-answer";
import { useTestOptionsListItem } from "@/app/test/hooks/use-test-options-list-item";

interface Props {
  option: OptionNoAnswer;
}

export const TestOptionsListItem = ({ option }: Props) => {
  const { selected, finished, getAnswerOptionState, handleAnswerOptionClick } =
    useTestOptionsListItem({ option });

  return (
    <AnswerOption
      key={option.id}
      option={option.letter}
      label={option.content}
      selected={selected}
      selectable={!finished}
      state={getAnswerOptionState(option)}
      onClick={() => handleAnswerOptionClick(option.id)}
    />
  );
};
