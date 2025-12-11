import { Markdown } from "@/app/_components/markdown";
import { Section } from "@/app/_components/section";
import { PrivacyPolicyTitle } from "@/app/privacy-policy/components/privacy-policy-title";
import { privacyPolicyMarkdown } from "@/app/privacy-policy/data/privacy-policy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Leia nossa Política de Privacidade para entender como coletamos, usamos e protegemos suas informações.",
};

export default async function PrivacyPolicy() {
  return (
    <Section className="*:w-full!">
      <PrivacyPolicyTitle />
      <Markdown>{privacyPolicyMarkdown}</Markdown>
    </Section>
  );
}
