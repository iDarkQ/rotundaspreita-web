import { MdCheckCircleOutline, MdQuestionMark } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

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
  const result =
    answer === undefined
      ? {
          label: "Em branco",
          icon: <MdOutlineRemoveCircleOutline aria-hidden="true" size={16} />,
          style: "bg-card-secondary text-neutral",
          numberStyle: "bg-card-secondary text-neutral",
        }
      : answer
        ? {
            label: "Correta",
            icon: <MdCheckCircleOutline aria-hidden="true" size={16} />,
            style: "bg-success-bg text-success",
            numberStyle: "bg-success-bg text-success",
          }
        : {
            label: "Errada",
            icon: <IoMdCloseCircleOutline aria-hidden="true" size={16} />,
            style: "bg-error-bg text-error",
            numberStyle: "bg-error-bg text-error",
          };

  return (
    <li className="flex flex-col gap-2 p-3 sm:p-4 lg:flex-row lg:items-center lg:gap-4">
      <span className="flex items-center gap-3 lg:contents">
        <span
          className={`order-1 flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold lg:order-1 ${result.numberStyle}`}
        >
          {index}
        </span>
        <span
          className={`order-2 flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium sm:text-sm lg:order-3 ${result.style}`}
        >
          {result.icon}
          {result.label}
        </span>
      </span>
      <span className="text-neutral order-2 min-w-0 flex-1 text-sm break-words sm:text-base lg:order-2">
        {question}
      </span>
    </li>
  );
};
