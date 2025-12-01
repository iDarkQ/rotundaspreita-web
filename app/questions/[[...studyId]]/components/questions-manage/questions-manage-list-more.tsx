import { Text } from "@/app/_components/text";
import clsx from "clsx";

interface Props {
  loading: boolean;
}

export const QuestionsManageListMore = ({ loading }: Props) => (
  <Text
    center
    className={clsx("opacity-0 transition-opacity", loading && "opacity-100")}
  >
    Carregando mais perguntas...
  </Text>
);
