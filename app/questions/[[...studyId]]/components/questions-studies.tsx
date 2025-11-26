import { Chip } from "@/app/_components/chip";
import { Text } from "@/app/_components/text";
import { QuestionsCreateStudy } from "@/app/questions/[[...studyId]]/components/questions-create-study";
import { QuestionsEditStudy } from "@/app/questions/[[...studyId]]/components/questions-edit-study";
import clsx from "clsx";
import { Link } from "@/app/_components/link";
import { Study } from "@/app/generated/prisma/browser";
import { Banner } from "@/app/_components/banner";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";

interface Props {
  studies: Study[];
  selectedStudy?: Study;
}

export const QuestionsStudies = async ({ studies, selectedStudy }: Props) => {
  const user = await fetchLoggedUser();
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <div className="flex gap-2 items-center justify-center w-full">
        {studies.length > 0 ? (
          studies.map((study) => (
            <Link key={study.id} link={`/questions/${study.id}`} hideStyles>
              <Chip
                clickable
                variant={
                  selectedStudy?.id === study.id ? "contained" : "outlined"
                }
              >
                <Text
                  as="p"
                  className={clsx(
                    selectedStudy?.id === study.id && "text-white"
                  )}
                >
                  {study.title}
                </Text>
              </Chip>
            </Link>
          ))
        ) : (
          <Banner center className="flex w-full z-1">
            <Text>Não há estudos neste momento</Text>
          </Banner>
        )}
      </div>
      {user?.admin && (
        <div className="flex gap-2 items-center justify-center">
          <QuestionsCreateStudy />
          {selectedStudy && (
            <QuestionsEditStudy
              study={studies.find((study) => study.id === selectedStudy?.id)!}
            />
          )}
        </div>
      )}
    </div>
  );
};
