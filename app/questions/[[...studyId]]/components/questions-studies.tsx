import { Chip } from "@/app/_components/chip";
import { Text } from "@/app/_components/text";
import { QuestionsCreateStudy } from "@/app/questions/[[...studyId]]/components/questions-create-study";
import { QuestionsEditStudy } from "@/app/questions/[[...studyId]]/components/questions-edit-study";
import clsx from "clsx";
import { Link } from "@/app/_components/link";
import { Study } from "@/app/generated/prisma/browser";

interface Props {
  studies: Study[];
  selectedStudy?: Study;
}

export const QuestionsStudies = ({ studies, selectedStudy }: Props) => (
  <div className="flex flex-col gap-2 items-center justify-center">
    <div className="flex gap-2 items-center justify-center">
      {studies.map((study) => (
        <Link key={study.id} link={`/questions/${study.id}`} hideStyles>
          <Chip
            clickable
            variant={selectedStudy?.id === study.id ? "contained" : "outlined"}
          >
            <Text
              as="p"
              className={clsx(selectedStudy?.id === study.id && "text-white")}
            >
              {study.title}
            </Text>
          </Chip>
        </Link>
      ))}
    </div>
    <div className="flex gap-2 items-center justify-center">
      <QuestionsCreateStudy />
      <QuestionsEditStudy
        study={studies.find((study) => study.id === selectedStudy?.id)!}
      />
    </div>
  </div>
);
