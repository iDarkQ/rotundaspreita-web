import { Section } from "@/app/_components/section";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { LoginButton } from "@/app/login/components/login-button";
import { RouteNames } from "@/app/_utils/route-names";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { LoginBlobs } from "@/app/login/components/login-blobs";
import { LoginHeading } from "@/app/login/components/login-heading/login-heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar na Plataforma",
  description:
    "Acesse sua conta na ROTUNDÁSPREITA para continuar sua preparação para os exames de instrutor ou diretor de escola de condução.",
};

export default async function Login() {
  const user = await fetchLoggedUser();

  if (user) {
    redirect(RouteNames.PANEL, RedirectType.push);
  }

  return (
    <Section className="justify-center!">
      <LoginBlobs />
      <LoginHeading />
      <LoginButton />
    </Section>
  );
}
