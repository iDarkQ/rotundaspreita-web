"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { PanelTestLink } from "@/app/panel/[[...studyId]]/components/panel-test-link";
import { useTestMenu } from "@/app/panel/[[...studyId]]/providers/test-menu";

export const PanelInitiateTestButton = () => {
  const { selectedStudy, selectedCategory, difficulty } = useTestMenu();

  const params: Record<string, string> = {
    s: selectedStudy?.id ?? "",
    d: difficulty.toString() ?? "",
  };

  if (selectedCategory !== "Todos") {
    params.c = selectedCategory;
  }

  return (
    <PanelTestLink params={params} className="w-full">
      <Button variant="contained" className="w-full">
        <Text as="p" className="text-white!">
          Iniciar teste
        </Text>
      </Button>
    </PanelTestLink>
  );
};
