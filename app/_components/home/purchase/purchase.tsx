import { PurchaseBlob } from "@/app/_components/home/purchase/purchase-blob";
import { PurchaseDescription } from "@/app/_components/home/purchase/purchase-description";
import { PurchasePlanCard } from "@/app/_components/home/purchase/purchase-plan-card";
import { PurchaseTitle } from "@/app/_components/home/purchase/purchase-title";
import { Section } from "@/app/_components/section";

export const HomePurchase = () => (
  <Section>
    <div
      id="purchase"
      className="relative flex min-h-[50vh] w-full flex-col items-center justify-center gap-2"
    >
      <PurchaseBlob />
      <PurchaseTitle />
      <PurchaseDescription />

      <PurchasePlanCard />
    </div>
  </Section>
);
