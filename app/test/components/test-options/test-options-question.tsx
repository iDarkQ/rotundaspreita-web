import { Text } from "@/app/_components/text";

interface Props {
  question: string;
}

export const TestOptionsQuestion = ({ question }: Props) => (
  <Text as="h3">{question}</Text>
);
