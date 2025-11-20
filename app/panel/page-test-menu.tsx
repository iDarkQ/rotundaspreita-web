import { Button } from "@/app/_components/button";
import { Card } from "@/app/_components/card";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { PanelInitiateTestButton } from "@/app/panel/components/panel-initiate-test-button";
import { PanelSelectCategory } from "@/app/panel/components/panel-select-category";
import { PanelSelectStudy } from "@/app/panel/components/panel-select-study";
import { PanelTabs } from "@/app/panel/panel-tabs";
import { TestMenuProvider } from "@/app/panel/providers/test-menu";
import {
  fetchAllStudies,
  fetchAllStudyCategories,
} from "@/services/study-service";

export const PageTestMenu = async () => {
  const studies = await fetchAllStudies();
  const defaultStudyId = studies[0]?.id;

  const categories = await fetchAllStudyCategories(defaultStudyId);

  return (
    <div className="grid grid-cols-2 gap-5">
      <Card className="gap-2">
        <Text as="h2" className="font-normal!">
          Iniciar novo teste de 30 minutos
        </Text>
        <Text as="p">Escolha um estudo e categoria de perguntas</Text>
        <TestMenuProvider
          studies={studies}
          categories={categories}
          defaultStudyId={defaultStudyId}
        >
          {/* <Select /> */}
          <div className="flex gap-2">
            <PanelSelectStudy />
            
            <PanelSelectCategory />
          </div>
          <Text as="p">Escolha um modo abaixo</Text>
          <PanelTabs />
          <PanelInitiateTestButton />
        </TestMenuProvider>
      </Card>
    </div>
  );
};
