"use client";

import { Button } from "@/app/_components/button";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { USER_LOGIN_STATUS } from "@/app/_constants/user-login-status";
import { posthogClient } from "@/app/_lib/instrumentation-client";
import { loginUserWithCredentials } from "@/app/_services/user-service";
import { RouteNames } from "@/app/_utils/route-names";
import { saveSecret } from "@/app/login/server/save-secret";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export const LoginCredentialsForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSubmitting = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting.current) return;

    isSubmitting.current = true;
    setError(null);
    setLoading(true);

    try {
      const result = await loginUserWithCredentials({ email, password });

      if (result?.status === USER_LOGIN_STATUS.RATE_LIMITED) {
        setError(
          "Demasiadas tentativas de início de sessão. Tente novamente mais tarde.",
        );
        return;
      }

      if (!result) {
        setError("Credenciais inválidas. Verifique o email e a palavra-passe.");
        return;
      }

      await saveSecret(result.secret);
      posthogClient?.capture("login", { method: "Credentials" });
      router.push(RouteNames.PANEL);
      router.refresh();
    } finally {
      isSubmitting.current = false;
      setLoading(false);
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit}
      noValidate
    >
      <Field className="gap-1">
        <Text as="label" htmlFor="login-email">
          Email
        </Text>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="nome@exemplo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Field>

      <Field className="gap-1">
        <Text as="label" htmlFor="login-password">
          Palavra-passe
        </Text>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="A sua palavra-passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </Field>

      {error && (
        <Text as="p" className="text-error!">
          {error}
        </Text>
      )}

      <Button type="submit" loading={loading}>
        <Text as="span" className="text-white">
          Entrar com email
        </Text>
      </Button>
    </form>
  );
};
