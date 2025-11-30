import { Button } from "@/app/_components/button";
import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";
import { IoMdCheckbox } from "react-icons/io";

interface Props {
  bulletList: string[];
  title: string;
  price: string;
}

export const PlanCard = ({ bulletList, title, price }: Props) => (
  <Card className="w-full max-w-120 gap-5 border-primary">
    <div className="flex items-center justify-between">
      <div>
        <Text>{title}</Text>
        <Text as="h3">{price}</Text>
      </div>
    </div>

    <ul>
      {bulletList.map((b, i) => (
        <li key={i} className="flex items-start gap-1">
          <IoMdCheckbox size={20} className="text-secondary" />
          <Text as="span">{b}</Text>
        </li>
      ))}
    </ul>

    <Button variant="contained">
      <Text className="text-white!">Comprar</Text>
    </Button>
  </Card>
);
