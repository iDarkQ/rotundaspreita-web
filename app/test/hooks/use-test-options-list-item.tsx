import { OptionNoAnswer } from "@/app/_types/option-no-answer";
import { useTestManager } from "@/app/test/providers/test-manager";

interface Props {
  option: OptionNoAnswer;
}

export const useTestOptionsListItem = ({ option }: Props) => {
  const {
    answers,
    setAnswers,
    questions,
    finished,
    correctAnswers,
    selectedPage,
    setSelectedPage,
  } = useTestManager();

  const currentIndex = questions.findIndex((q) => q.id === selectedPage);
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
    if (currentPage < questions.length && !answers[selectedPage]) {
      setTimeout(() => {
        const nextQuestionId = questions[currentIndex + 1];
        setSelectedPage(nextQuestionId.id);
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
