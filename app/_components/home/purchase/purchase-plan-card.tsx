import { PlanCard } from "@/app/_components/home/plan-card";

export const PurchasePlanCard = () => (
  <PlanCard
    bulletList={[
      "Acesso a todos os estudos (diretor, instrutor)",
      "Acesso total a 1000+ questões",
      "Testes ilimitados de 30 minutos",
      "Estatística modernas e completas",
      "Atualizações automáticas",
    ]}
    title="Plano Único"
    price="4.99€/mês"
  />
);
