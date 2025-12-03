import { PlanCard } from "@/app/_components/home/plan-card";
import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Text } from "@/app/_components/text";

export const HomePurchase = () => (
  <Section>
    <div
      id="purchase"
      className="relative flex min-h-[50vh] w-full flex-col items-center justify-center gap-2"
    >
      <div className="absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 transform opacity-50">
        <Blob1 />
      </div>
      <Text as="h2" className="z-1 text-center">
        Escolha o seu plano
      </Text>
      <Text className="z-1 text-center">
        Acesso completo por apenas 2.99€/mês.
      </Text>
      <PlanCard
        bulletList={[
          "Acesso a todos os estudos (diretor, instrutor)",
          "Acesso total a 900+ questões",
          "Testes ilimitados de 30 minutos",
          "Estatística modernas e completas",
          "Atualizações automáticas",
        ]}
        title="Plano Único"
        price="2.99€/mês"
        description="Primeiro pagamento: 4.99€"
      />
    </div>
  </Section>
);
