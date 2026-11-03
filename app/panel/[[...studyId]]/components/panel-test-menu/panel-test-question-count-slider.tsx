"use client";

import { Disclosure } from "@/app/_components/disclosure/disclosure";
import { DisclosureButton } from "@/app/_components/disclosure/disclosure-button";
import { Text } from "@/app/_components/text";
import { useTestQuestionCount } from "@/app/panel/[[...studyId]]/hooks/use-test-question-count";
import { PanelTestQuestionCountRange } from "@/app/panel/[[...studyId]]/components/panel-test-menu/panel-test-question-count-range";
import { RECOMMENDED_TEST_QUESTION_COUNT } from "@/app/_utils/test-question-count";
import { DisclosurePanel } from "@headlessui/react";
import { MdStar } from "react-icons/md";

export const PanelTestQuestionCountSlider = () => {
  const [questionCount, setQuestionCount] = useTestQuestionCount();
  const isRecommended = questionCount === RECOMMENDED_TEST_QUESTION_COUNT;

  return (
    <Disclosure>
      <DisclosureButton>Definições do teste</DisclosureButton>
      <DisclosurePanel
        data-testid="test-question-count-panel"
        className="flex w-0 min-w-full flex-col gap-5 px-5 pt-2 pb-8"
      >
        <Text className="text-sm">
          Cada pergunta tem 1 minuto, por isso a duração do teste é igual ao
          número de perguntas.
        </Text>

        <div className="flex flex-wrap items-center justify-between gap-x-3">
          <Text as="span" className="text-primary text-xl! font-bold">
            {questionCount} perguntas · {questionCount} minutos
          </Text>
          {isRecommended && (
            <Text
              as="span"
              className="text-primary inline-flex items-center gap-1 text-sm font-bold"
            >
              <MdStar size={16} className="text-secondary" aria-hidden="true" />
              Recomendado
            </Text>
          )}
        </div>

        <PanelTestQuestionCountRange
          value={questionCount}
          onChange={setQuestionCount}
        />
      </DisclosurePanel>
    </Disclosure>
  );
};
