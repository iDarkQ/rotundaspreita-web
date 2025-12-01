import { Section } from "@/app/_components/section";
import { FAQQuestions } from "@/app/faq/faq-questions";
import { FAQTitle } from "@/app/faq/faq-title";

export default async function FAQ() {
  return (
    <Section>
      <FAQTitle />
      <FAQQuestions />
    </Section>
  );
}
