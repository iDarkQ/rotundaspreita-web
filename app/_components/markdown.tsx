import { Divider } from "@/app/_components/divider";
import { Text } from "@/app/_components/text";
import ReactMarkdown from "react-markdown";

interface Props {
  children: string;
}

export const Markdown = ({ children }: Props) => (
  <ReactMarkdown
    components={{
      h1: ({ node, ...props }) => <Text as="h1" {...props} />,
      h2: ({ node, ...props }) => <Text as="h2" {...props} />,
      h3: ({ node, ...props }) => <Text as="h3" {...props} />,
      h4: ({ node, ...props }) => <Text as="h4" {...props} />,
      p: ({ node, ...props }) => <Text {...props} />,
      hr: () => <Divider />,
    }}
  >
    {children}
  </ReactMarkdown>
);
