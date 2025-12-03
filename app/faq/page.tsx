import { Section } from "@/app/_components/section";
import { FAQQuestions } from "@/app/faq/components/faq-questions";
import { FAQTitle } from "@/app/faq/components/faq-title";

export default async function FAQ() {
  return (
    <Section>
      <FAQTitle />
      <FAQQuestions />
    </Section>
  );
}
