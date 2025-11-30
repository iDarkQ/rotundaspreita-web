"use client";

import { Banner } from "@/app/_components/banner";
import { Card } from "@/app/_components/card";
import { Text } from "@/app/_components/text";
import { Study } from "@/app/generated/prisma/browser";
import { PanelInitiateTestButton } from "@/app/panel/[[...studyId]]/components/panel-initiate-test-button";
import { PanelSelectCategory } from "@/app/panel/[[...studyId]]/components/panel-select-category";
import { PanelSelectStudy } from "@/app/panel/[[...studyId]]/components/panel-select-study";
import { PanelTabs } from "@/app/panel/[[...studyId]]/panel-tabs";
import { TestMenuProvider } from "@/app/panel/[[...studyId]]/providers/test-menu";
import clsx from "clsx";
import { HTMLAttributes, forwardRef } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  studies: Study[];
  defaultStudyId?: string;
  categories: string[];
  className?: string;
}

export const PageTestMenu = forwardRef<HTMLDivElement, Props>(
  ({ studies, defaultStudyId, className, categories, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest} className={clsx(className && className)}>
        {studies.length > 0 && defaultStudyId ? (
          <Card className="gap-2 w-full">
            <Text as="h2" className="font-normal!">
              Iniciar novo teste de 30 minutos
            </Text>
            <Text as="p">Escolha um estudo e tema</Text>
            <TestMenuProvider
              studies={studies}
              categories={categories}
              defaultStudyId={defaultStudyId}
            >
              <div className="flex gap-2">
                <PanelSelectStudy
                  studies={studies}
                  selectedStudyId={defaultStudyId}
                />
                <PanelSelectCategory />
              </div>
              <Text as="p">Escolha um modo abaixo</Text>
              <PanelTabs />
              <PanelInitiateTestButton />
            </TestMenuProvider>
          </Card>
        ) : (
          <Banner className="flex-1">
            <Text>Não há estudos neste momento</Text>
          </Banner>
        )}
      </div>
    );
  }
);

PageTestMenu.displayName = "PageTestMenu";
