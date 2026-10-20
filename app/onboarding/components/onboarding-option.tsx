import { Text } from "@/app/_components/text";
import clsx from "clsx";
import { MdCheckCircle } from "react-icons/md";

interface Props {
  selected: boolean;
  title: string;
  description?: string;
  badge?: string;
  type?: "radio" | "checkbox";
  onClick: () => void;
}

export const OnboardingOption = ({
  selected,
  title,
  description,
  badge,
  type = "radio",
  onClick,
}: Props) => (
  <button
    type="button"
    role={type}
    aria-checked={selected}
    onClick={onClick}
    className={clsx(
      "c-border focus-visible:outline-primary flex w-full cursor-pointer items-center justify-between gap-3 bg-white p-4 text-left transition-colors hover:bg-black/5 focus-visible:outline-2",
      selected && "border-primary! bg-primary/5!",
    )}
  >
    <span className="flex flex-col gap-1">
      <span className="flex items-center gap-2">
        <Text as="span" className="font-[800]">
          {title}
        </Text>
        {badge && (
          <span className="bg-primary rounded-full px-2 py-0.5 text-xs text-white">
            {badge}
          </span>
        )}
      </span>
      {description && (
        <Text as="span" className="text-sm opacity-70">
          {description}
        </Text>
      )}
    </span>
    <MdCheckCircle
      aria-hidden="true"
      size={24}
      className={clsx(
        "text-primary shrink-0 transition-opacity",
        selected ? "opacity-100" : "opacity-0",
      )}
    />
  </button>
);
