"use client";

import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Text } from "@/app/_components/text";
import { useTestManager } from "@/app/test/providers/test-manager";

interface Props {
  onClose: () => void;
}

export const TestFinishDialog = ({ onClose }: Props) => {
  const { finishTest } = useTestManager();

  const handleButtonClick = () => {
    finishTest();
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="Confirmação Para Conclusão Do Teste">
      <DialogPart>
        <Text>
          Tem a certeza de que deseja terminar este teste? Ainda não respondeu a
          todas as perguntas.
        </Text>
      </DialogPart>
      <DialogPart className="flex-row!">
        <Button
          onClick={handleButtonClick}
          variant="outlined"
          className="flex-1"
        >
          <Text className="text-primary!">Finalizar Teste</Text>
        </Button>
        <Button onClick={onClose} variant="outlined" className="flex-1">
          <Text className="text-primary!">Continuar Teste</Text>
        </Button>
      </DialogPart>
    </Dialog>
  );
};
