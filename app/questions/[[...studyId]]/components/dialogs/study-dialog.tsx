import { Button } from "@/app/_components/button";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Divider } from "@/app/_components/divider";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { Study } from "@/app/generated/prisma/browser";
import { updateStudy, deleteStudy, createStudy } from "@/services/study-service";
import { RouteNames } from "@/utils/route-names";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
  onClose: () => void;
  study?: Study;
}

export const StudyDialog = ({ onClose, study }: Props) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = async () => {
    if (!titleRef.current || !descriptionRef.current) return;

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    if (study) {
      await updateStudy(study.id, title, description);
      router.refresh();
    } else {
      const study = await createStudy(title, "Lorem ipsum sit dolor amet");
      if (study) {
        router.push(RouteNames.QUESTIONS + "/" + study.id);
      }
    }

    onClose();
  };

  const handleDeleteStudy = async () => {
    if (!study) return;
    await deleteStudy(study.id);
    router.push(RouteNames.QUESTIONS);
    onClose();
  };

  return (
    <Dialog onClose={onClose} title={study ? "Aterar Estudo" : "Criar Estudo"}>
      <DialogPart>
        <Field>
          <Text as="label">Título Do Estudo</Text>
          <Input
            ref={titleRef}
            name="study_name"
            type="text"
            placeholder="Título do estudo"
            className="w-full"
            defaultValue={study?.title}
          />
        </Field>
        <Field>
          <Text as="label">Descrição Do Estudo</Text>
          <Input
            ref={descriptionRef}
            name="study_description"
            type="text"
            placeholder="Descrição Do Estudo"
            className="w-full"
            defaultValue={study?.description}
          />
        </Field>
      </DialogPart>
      <Divider />
      <DialogPart>
        <Button onClick={handleButtonClick}>
          <Text className="text-white!">
            {!!study ? "Confirmar Alterações" : "Criar Estudo"}
          </Text>
        </Button>
        {study && (
          <Button onClick={handleDeleteStudy} variant="warning">
            <Text className="text-white!">Eliminar Estudo</Text>
          </Button>
        )}
      </DialogPart>
    </Dialog>
  );
};
