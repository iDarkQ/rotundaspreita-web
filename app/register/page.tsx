import { Metadata } from "next";
import { RedirectType, redirect } from "next/navigation";
import { Section } from "@/app/_components/section";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { RouteNames } from "@/app/_utils/route-names";
import { LoginBlobs } from "@/app/login/components/login-blobs";
import { RegisterHeading } from "@/app/register/components/register-heading";
import { RegisterOptions } from "@/app/register/components/register-options";

export const metadata: Metadata = {
  title: "Criar Conta",
  description:
    "Crie a sua conta na ROTUNDÁSPREITA para acompanhar a sua preparação para os exames de condução.",
};

export default async function Register() {
  const user = await fetchLoggedUser();

  if (user) {
    redirect(RouteNames.PANEL, RedirectType.push);
  }

  return (
    <Section className="justify-center!">
      <LoginBlobs />
      <RegisterHeading />
      <RegisterOptions />
    </Section>
  );
}
