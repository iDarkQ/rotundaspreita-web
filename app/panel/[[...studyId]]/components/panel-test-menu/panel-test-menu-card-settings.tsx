import { Text } from "@/app/_components/text";
import { Study } from "@/app/generated/prisma/browser";
import { PanelInitiateTestButton } from "@/app/panel/[[...studyId]]/components/panel-initiate-test-button";
import { PanelSelectCategory } from "@/app/panel/[[...studyId]]/components/panel-select-category";
import { PanelSelectStudy } from "@/app/panel/[[...studyId]]/components/panel-select-study";
import { PanelTestMenuCardTabs } from "@/app/panel/[[...studyId]]/components/panel-test-menu/panel-test-menu-card-tabs";
import { TestMenuProvider } from "@/app/panel/[[...studyId]]/providers/test-menu";

interface Props {
  studies: Study[];
  defaultStudyId: string;
  categories: string[];
}

export const PanelTestMenuCardSettings = ({
  studies,
  categories,
  defaultStudyId,
}: Props) => (
  <TestMenuProvider
    studies={studies}
    categories={categories}
    defaultStudyId={defaultStudyId}
  >
    <div className="flex gap-2 max-md:flex-col">
      <PanelSelectStudy studies={studies} selectedStudyId={defaultStudyId} />
      <PanelSelectCategory />
    </div>
    <Text as="p">Escolha um modo abaixo</Text>
    <PanelTestMenuCardTabs />
    <PanelInitiateTestButton />
  </TestMenuProvider>
);
