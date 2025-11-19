import { Section } from "@/app/_components/section";
import { Text } from "@/app/_components/text";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { LoginButton } from "@/app/login/login-button";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function Login() {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for");
  const agent = headersList.get("user-agent");

  const user = await fetchLoggedUser();

  if(user) {
    redirect("/panel", RedirectType.push);
  }
  
  if (!ip || !agent) {
    redirect("/");
  }

  return (
    <Section>
      <Text as="h1">Login</Text>
      <Text as="p">
        Create / Login into your Bom Condutor account by clicking the button
        below
      </Text>
      <LoginButton ip={ip} agent={agent} />
    </Section>
  );
}
