import { OptionNoAnswer } from "@/app/_types/option-no-answer";
import { useTestManager } from "@/app/test/providers/test-manager";

interface Props {
  option: OptionNoAnswer;
}

export const useTestOptionsListItem = ({ option }: Props) => {
  const {
    answers,
    setAnswers,
    questionIds,
    finished,
    correctAnswers,
    selectedPage,
    updateSelectedQuestion,
  } = useTestManager();

  const currentIndex = questionIds.indexOf(selectedPage);
  const currentPage = currentIndex === -1 ? 0 : currentIndex + 1;

  const getAnswerOptionState = (option: OptionNoAnswer) => {
    const userAnswer = answers[selectedPage];

    const correctAnswerId = correctAnswers[selectedPage];

    let state: "correct" | "wrong" | undefined = undefined;

    if (finished) {
      if (userAnswer === option.id) {
        state = userAnswer === correctAnswerId ? "correct" : "wrong";
      }

      if (option.id === correctAnswerId) {
        state = "correct";
      }
    }

    return state;
  };

  const handleAnswerOptionClick = (optionId: string) => {
    if (finished) return;
    if (currentPage < questionIds.length && !answers[selectedPage]) {
      setTimeout(() => {
        updateSelectedQuestion(questionIds[currentIndex + 1]);
      }, 500);
    }

    setAnswers((prev) => ({
      ...prev,
      [selectedPage]: optionId,
    }));
  };

  const selected = !finished
    ? answers[selectedPage]
      ? answers[selectedPage] === option.id
      : false
    : undefined;

  return {
    selected,
    finished,
    getAnswerOptionState,
    handleAnswerOptionClick,
  };
};
