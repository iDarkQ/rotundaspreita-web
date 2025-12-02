import { Chip } from "@/app/_components/chip";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { RouteNames } from "@/app/_utils/route-names";
import clsx from "clsx";

interface Props {
  id: string;
  selectedStudyId?: string;
  title: string;
}

export const QuestionsStudiesListItem = ({
  id,
  title,
  selectedStudyId,
}: Props) => (
  <Link key={id} link={RouteNames.QUESTIONS + `/${id}`} hideStyles>
    <Chip clickable variant={selectedStudyId === id ? "contained" : "outlined"}>
      <Text as="p" className={clsx(selectedStudyId === id && "text-white")}>
        {title}
      </Text>
    </Chip>
  </Link>
);
