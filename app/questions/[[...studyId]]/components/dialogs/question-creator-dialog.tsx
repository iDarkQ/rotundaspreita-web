"use client";

import { AnswerOption } from "@/app/_components/answer-option";
import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog";
import { Divider } from "@/app/_components/divider";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { useQuestionCreatorDialog } from "@/app/questions/[[...studyId]]/hooks/use-question-creator-dialog";
import { QuestionWithOptions } from "@/types/question-with-options";

interface Props {
  onClose: () => void;
  question?: QuestionWithOptions;
  selectedStudy: string;
}

const MAX_ANSWERS = 5;

export const QuestionCreatorDialog = ({
  onClose,
  question: baseQuestion,
  selectedStudy,
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
      title={isEditMode ? "Edit Question" : "Question Creator"}
    >
      <Field>
        <Text as="label">Question</Text>
        <Input
          type="text"
          placeholder="Question"
          className="w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Field>

      <Field>
        <Text as="label">Category</Text>
        <Input
          type="text"
          placeholder="Category"
          className="w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Field>

      <Divider />

      <div className="flex flex-col gap-2">
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
            onChange={(value) => updateOptionContent(opt.id, value)}
          />
        ))}
      </div>

      <Button variant="outlined" onClick={addAnswer} disabled={!canAddMore}>
        <Text>
          {canAddMore
            ? "Add Option"
            : `Max answers reached ${optionsDto.length}/${MAX_ANSWERS}`}
        </Text>
      </Button>

      <Divider />

      <Button onClick={handleCreateOrSave} disabled={!canCreate}>
        <Text className="text-white!">{isEditMode ? "Save" : "Create"}</Text>
      </Button>

      {isEditMode && (
        <Button className="mt-2" onClick={handleDelete} variant="warning">
          <Text className="text-white!">Delete</Text>
        </Button>
      )}
    </Dialog>
  );
};
