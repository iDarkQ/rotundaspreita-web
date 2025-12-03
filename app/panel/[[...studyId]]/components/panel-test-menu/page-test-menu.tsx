import { Study } from "@/app/generated/prisma/browser";
import { PageTestMenuCard } from "@/app/panel/[[...studyId]]/components/panel-test-menu/page-test-menu-card";
import { PageTestMenuEmpty } from "@/app/panel/[[...studyId]]/components/panel-test-menu/page-test-menu-empty";

interface Props {
  studies: Study[];
  defaultStudyId?: string;
  categories: string[];
  className?: string;
}

export const PageTestMenu = ({
  studies,
  defaultStudyId,
  className,
  categories,
}: Props) =>
  studies.length > 0 && defaultStudyId ? (
    <PageTestMenuCard
      studies={studies}
      defaultStudyId={defaultStudyId}
      categories={categories}
      className={className}
    />
  ) : (
    <PageTestMenuEmpty />
  );
