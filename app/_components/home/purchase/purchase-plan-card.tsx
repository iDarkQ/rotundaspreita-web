import { PlanCard } from "@/app/_components/home/plan-card";

export const PurchasePlanCard = () => (
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
);
