import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
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

  if (user) {
    redirect("/panel", RedirectType.push);
  }

  if (!ip || !agent) {
    redirect("/");
  }

  return (
    <Section className="justify-center!">
      <PositionedBlob
        align="left"
        className="w-100 h-100 top-[15vh] -left-[5vh]! opacity-50"
      >
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob
        align="right"
        className="w-100 h-100 top-[60vh] -right-[5vh]! opacity-50"
      >
        <Blob4 />
      </PositionedBlob>
      <div className="flex flex-col items-center justify-center">
        <Text as="h1" center>Iniciar sessão</Text>
        <Text as="p" center>
          Antes de efetuar um pagamento, crie uma conta ou faça login usando o
          botão abaixo.
        </Text>
      </div>
      <LoginButton ip={ip} agent={agent} />
    </Section>
  );
}
