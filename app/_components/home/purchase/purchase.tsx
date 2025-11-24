import { PlanCard } from "@/app/_components/home/plan-card";
import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Text } from "@/app/_components/text";

export const HomePurchase = () => (
  <Section>
    <div className="relative flex flex-col gap-2 w-full items-center justify-center min-h-[50vh]">
      <div className="h-200 w-200 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50">
        <Blob1 />
      </div>
      <Text as="h2" className="text-center z-1">
        Escolha o seu plano
      </Text>
      <Text className="text-center z-1">Acesso completo por apenas 2.99€/mês.</Text>
      <PlanCard
        bulletList={[
          "Acesso a todos os estudos (diretor, instrutor)",
          "Acesso total a 600+ questões",
          "Testes ilimitados de 30 minutos",
          "Estatística modernas e completas",
          "Atualizações automáticas",
        ]}
        title="Plano Único"
        price="2.99€/mês"
      />
    </div>
  </Section>
);
