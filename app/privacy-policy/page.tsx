import { Markdown } from "@/app/_components/markdown";
import { Section } from "@/app/_components/section";
import { PrivacyPolicyTitle } from "@/app/privacy-policy/components/privacy-policy-title";
import { privacyPolicyMarkdown } from "@/app/privacy-policy/data/privacy-policy";

export default async function PrivacyPolicy() {
  return (
    <Section className="*:w-full!">
      <PrivacyPolicyTitle />
      <Markdown>{privacyPolicyMarkdown}</Markdown>
    </Section>
  );
}
