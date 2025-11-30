"use client";

import { AnswerOption } from "@/app/_components/answer-option";
import { Button } from "@/app/_components/button";
import { ComboboxInput } from "@/app/_components/combobox/combobox-input";
import { ComboboxOption } from "@/app/_components/combobox/combobox-option";
import { ComboboxOptions } from "@/app/_components/combobox/combobox-options";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Divider } from "@/app/_components/divider";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { useQuestionCreatorDialog } from "@/app/questions/[[...studyId]]/hooks/use-question-creator-dialog";
import { QuestionWithOptions } from "@/types/question-with-options";
import { Combobox, RadioGroup } from "@headlessui/react";

interface Props {
  onClose: () => void;
  question?: QuestionWithOptions;
  selectedStudy: string;
  categories: string[];
}

const MAX_ANSWERS = 5;

export const QuestionCreatorDialog = ({
  onClose,
  question: baseQuestion,
  selectedStudy,
  categories,
}: Props) => {
  const { options: baseOptions } = baseQuestion ?? {};
  const {
    canCreate,
    isEditMode,
    category,
    setCategory,
    question,
    setQuestion,
    optionsDto,
    optionLetter,
    selectedAnswerId,
    removeAnswer,
    setCorrectAnswer,
    updateOptionContent,
    canAddMore,
    addAnswer,
    handleCreateOrSave,
    handleDelete,
  } = useQuestionCreatorDialog({
    baseQuestion,
    baseOptions,
    onClose,
    selectedStudy,
  });

  return (
    <Dialog
      onClose={onClose}
      title={isEditMode ? "Alterar Pergunta" : "Criar Pergunta"}
    >
      <DialogPart>
        <Field>
          <Text as="label">Pergunta</Text>
          <Input
            type="text"
            placeholder="Pergunta"
            className="w-full"
            value={question}
            onChange={(e) => {
              const sanitized = e.target.value
                .replace(/[\t\n\r]/g, " ")
                .replace(/ {2,}/g, " ")
                .trim();

              setQuestion(sanitized);
            }}
          />
        </Field>

        <Field>
          <Text as="label">Tema</Text>
          <Combobox value={category} onChange={(v) => setCategory(v ?? "")}>
            <ComboboxInput
              placeholder="Tema"
              aria-label="Assignee"
              displayValue={(c) => c}
              onChange={(event) => setCategory(event.target.value)}
            />
            <ComboboxOptions anchor="bottom">
              {categories.map((person) => (
                <ComboboxOption key={person} value={person}>
                  {person}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </Field>
      </DialogPart>

      <Divider />

      <DialogPart>
        {optionsDto.map((opt, idx) => (
          <AnswerOption
            key={opt.id}
            option={optionLetter(idx)}
            label={opt.content}
            selected={selectedAnswerId === opt.id}
            defaultValue={opt.content}
            editable
            onDelete={() => removeAnswer(opt.id)}
            onClick={() => setCorrectAnswer(opt.id)}
            value={optionsDto.find((o) => o.id === opt.id)?.content ?? ""}
            onChange={(e) => {
              const sanitized = e.target.value
                .replace(/[\t\n\r]/g, " ")
                .replace(/ {2,}/g, " ")
                .trim();

              updateOptionContent(opt.id, sanitized);
            }}
          />
        ))}

        <Button variant="outlined" onClick={addAnswer} disabled={!canAddMore}>
          <Text>
            {canAddMore
              ? "Adicionar Opção"
              : `Respostas máximas alcançadas: ${optionsDto.length}/${MAX_ANSWERS}`}
          </Text>
        </Button>
      </DialogPart>

      <Divider />

      <DialogPart>
        <Button onClick={handleCreateOrSave} disabled={!canCreate}>
          <Text className="text-white!">
            {isEditMode ? "Guardar" : "Criar"}
          </Text>
        </Button>

        {isEditMode && (
          <Button onClick={handleDelete} variant="warning">
            <Text className="text-white!">Eliminar</Text>
          </Button>
        )}
      </DialogPart>
    </Dialog>
  );
};
