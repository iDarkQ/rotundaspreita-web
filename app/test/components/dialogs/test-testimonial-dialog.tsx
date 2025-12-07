import { Button } from "@/app/_components/button";
import { Checkbox } from "@/app/_components/checkbox";
import { Dialog } from "@/app/_components/dialog/dialog";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Divider } from "@/app/_components/divider";
import { Text } from "@/app/_components/text";
import { Textarea } from "@/app/_components/textarea";
import { posthogClient } from "@/app/_lib/instrumentation-client";
import { writeTestimonial } from "@/app/_services/testimonial-service";
import { useRef, useState } from "react";

interface Props {
  onClose: () => void;
}

export const TestTestimonialDialog = ({ onClose }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [check, setCheck] = useState(false);
  const handleCreateTestimonial = async () => {
    const message = inputRef.current?.value;
    const anonymous = check;

    if (!message) return;

    const testimonial = await writeTestimonial(message.trim(), anonymous);
    if (!testimonial) return;

    posthogClient.capture("testimonial", {
      message: testimonial?.message,
      anonymous: testimonial?.anonymous,
      userId: testimonial?.userId,
    });

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} title="Testemunho">
      <DialogPart>
        <Text>
          Olá! Reparemos que tem tido um ótimo desempenho no nosso site e
          gostaríamos muito de saber a sua opinião sobre a sua experiência. O
          seu feedback ajuda-nos a melhorar e também a inspirar outros
          utilizadores. Se concordar, poderemos apresentar a sua mensagem na
          página inicial. E não se preocupe, se preferir manter-se anónimo,
          basta assinalar a caixa antes de enviar o seu comentário. Obrigado por
          nos ajudar a tornar o site ainda melhor!
        </Text>
        <Textarea
          ref={inputRef}
          placeholder="O que achou da sua experiência no site?"
        />
        <div className="flex flex-row items-center gap-1">
          <Checkbox checked={check} onClick={() => setCheck((prev) => !prev)} />
          <Text>Quero que a minha mensagem seja anónima</Text>
        </div>
      </DialogPart>
      <Divider />
      <DialogPart>
        <Button onClick={handleCreateTestimonial}>
          <Text className="text-white!">Submeter Testemunho</Text>
        </Button>
      </DialogPart>
    </Dialog>
  );
};
