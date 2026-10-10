import { Text } from "@/app/_components/text";
import { RouteNames } from "@/app/_utils/route-names";
import { AuthMethods } from "@/app/login/components/auth-methods";
import { RegisterForm } from "@/app/register/components/register-form";
import Link from "next/link";

export const RegisterOptions = () => (
  <AuthMethods
    mode="register"
    footer={
      <Text as="p" center>
        Já tem conta?{" "}
        <Link
          className="text-primary font-medium underline underline-offset-4"
          href={RouteNames.LOGIN}
        >
          Iniciar sessão
        </Link>
      </Text>
    }
  >
    <RegisterForm />
  </AuthMethods>
);
