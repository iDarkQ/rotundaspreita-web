import { CanvasText } from "@/app/_components/canvas-text";
import { Text } from "@/app/_components/text";

interface Props {
  id?: string;
  question: string;
}

export const TestOptionsQuestion = ({ id, question }: Props) => (
  <Text as="h3" className="w-full">
    <CanvasText
      text={question}
      testId="test-question"
      entityId={id}
      centerBlock
    />
  </Text>
);
