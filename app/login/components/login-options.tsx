import { Text } from "@/app/_components/text";
import { RouteNames } from "@/app/_utils/route-names";
import { AuthMethods } from "@/app/login/components/auth-methods";
import { LoginCredentialsForm } from "@/app/login/components/login-credentials-form";
import Link from "next/link";

export const LoginOptions = () => (
  <AuthMethods
    mode="login"
    footer={
      <Text as="p" center>
        Ainda não tem conta?{" "}
        <Link
          className="text-primary font-medium underline underline-offset-4"
          href={RouteNames.REGISTER}
        >
          Criar conta com email
        </Link>
      </Text>
    }
  >
    <LoginCredentialsForm />
  </AuthMethods>
);
