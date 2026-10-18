import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";

interface TestimonialCardProps {
  name: string;
  registeredSince: string;
  message: string;
}

export const TestimonialCard = ({
  name,
  registeredSince,
  message,
}: TestimonialCardProps) => (
  <Card className="h-full w-[min(85vw,24rem)] shrink-0 gap-4 rounded-lg p-6">
    <div className="flex flex-col gap-1">
      <Text as="h3" className="text-xl">
        {name}
      </Text>
      <Text className="text-sm opacity-70">{registeredSince}</Text>
    </div>
    <Text className="text-sm leading-relaxed">{message}</Text>
  </Card>
);
