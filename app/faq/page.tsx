import { Section } from "@/app/_components/section";
import { FAQQuestions } from "@/app/faq/components/faq-questions";
import { FAQTitle } from "@/app/faq/components/faq-title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perguntas Frequentes | ROTUNDÁSPREITA",
  description:
    "Encontre respostas para dúvidas comuns sobre os exames, funcionalidades da plataforma e como se tornar instrutor ou diretor de escola de condução.",
};

export default async function FAQ() {
  return (
    <Section>
      <FAQTitle />
      <FAQQuestions />
    </Section>
  );
}
