"use client";

import { useState, useRef } from "react";
import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Divider } from "@/app/_components/divider";
import { MdOutlineFileUpload } from "react-icons/md";
import { ProgressBar } from "@/app/_components/progress-bar";
import { Text } from "@/app/_components/text";
import { createQuestion } from "@/app/_services/question-service";
import { OptionLetter } from "@/app/generated/prisma/enums";
import { useManageSelectedStudy } from "@/app/questions/[[...studyId]]/providers/manage-selected-study";

interface Props {
  onClose: () => void;
}

export const QuestionsImportDialog = ({ onClose }: Props) => {
  const { study: selectedStudy } = useManageSelectedStudy();

  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(0);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setProgress(0);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        setError("O ficheiro deve conter um array de perguntas.");
        return;
      }

      setMax(parsed.length);
      setLoading(true);

      for (let i = 0; i < parsed.length; i++) {
        const q = parsed[i];
        if (!validateQuestion(q)) {
          setError(`Formato inválido na pergunta ${i + 1}`);
          break;
        }

        const payload = {
          question: q.question,
          category: q.category,
          options: Object.entries(q.answers).map(([key, value]) => ({
            letter: key as OptionLetter,
            content: value as string,
            answer: key === q.correctAnswer,
          })),
        };

        try {
          await createQuestion(
            selectedStudy.id,
            payload.question,
            payload.category,
            payload.options,
          );
        } catch (err) {
          console.error({ err });
          setError(`Erro ao criar pergunta ${i + 1}`);
          break;
        }

        setProgress(i + 1);
      }
    } catch (err) {
      console.error({ err });
      setError("Erro ao ler ou analisar o ficheiro JSON.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} title="Importar Perguntas" onClose={onClose}>
      <DialogPart className="flex flex-col gap-2">
        <Text>
          Carregue um ficheiro <code>.json</code> contendo um array de
          perguntas. Cada pergunta deve incluir os campos <code>question</code>,
          <code> category</code>,<code> answers</code> (objeto com opções A, B,
          C, etc.), e <code>correctAnswer </code>
          (a chave da resposta correta).
        </Text>
        <Text>Exemplo de formato esperado:</Text>
        <Text
          as="pre"
          className="overflow-x-auto rounded bg-black/5 p-2 text-xs"
        >
          {`[
  {
    "question": "What is the capital of Portugal?",
    "category": "Geography",
    "answers": {
      "A": "Lisbon",
      "B": "Porto",
      "C": "Coimbra",
      "D": "Braga"
    },
    "correctAnswer": "A"
  }
]`}
        </Text>
      </DialogPart>

      <Divider />

      <DialogPart className="flex flex-col gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
          className="hidden"
        />

        <Button
          className="flex items-center justify-center gap-1"
          onClick={() => fileInputRef.current?.click()}
        >
          <Text className="text-white!">Carregar Ficheiro Json</Text>
          <MdOutlineFileUpload size={20} className="text-white!" />
        </Button>

        {loading || progress > 0 ? (
          <ProgressBar
            label="Progresso"
            value={progress}
            max={max}
            info={error ? "Erro" : undefined}
          />
        ) : null}

        {error && <Text className="text-red-500">{error}</Text>}
      </DialogPart>
    </Dialog>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateQuestion = (obj: any) => {
  if (!obj.question || typeof obj.question !== "string") return false;
  if (!obj.category || typeof obj.category !== "string") return false;
  if (!obj.answers || typeof obj.answers !== "object") return false;
  if (!obj.correctAnswer || typeof obj.correctAnswer !== "string") return false;
  return true;
};
