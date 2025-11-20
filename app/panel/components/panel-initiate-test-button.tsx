"use client";

import { Button } from "@/app/_components/button";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { useTestMenu } from "@/app/panel/providers/test-menu";

export const PanelInitiateTestButton = () => {
  const { selectedStudy, selectedCategory, difficulty } = useTestMenu();

  const params = new URLSearchParams({
    s: selectedStudy?.id ?? "",
    d: difficulty.toString() ?? "",
  });

  if (selectedCategory !== "Todos") {
    params.set("c", selectedCategory);
  }

  const href = `/test?${params.toString()}`;

  return (
    <Link
      link={href}
      className="w-full"
    >
      <Button variant="contained" className="w-full">
        <Text as="p" className="text-white!">
          Iniciar teste
        </Text>
      </Button>
    </Link>
  );
};
