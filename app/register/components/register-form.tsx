"use client";

import { Button } from "@/app/_components/button";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { USER_REGISTRATION_STATUS } from "@/app/_constants/user-registration-status";
import { posthogClient } from "@/app/_lib/instrumentation-client";
import { registerUserWithCredentials } from "@/app/_services/user-service";
import { RouteNames } from "@/app/_utils/route-names";
import { saveSecret } from "@/app/login/server/save-secret";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSubmitting = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting.current) return;

    setError(null);

    if (!email.trim() || !name.trim() || !lastName.trim()) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (password.trim().length < 8) {
      setError("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }

    isSubmitting.current = true;
    setLoading(true);

    try {
      const result = await registerUserWithCredentials({
        email,
        password,
        name,
        lastName,
      });

      if (
        result?.status === USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED
      ) {
        setError(
          "Já existe uma conta registada com este email. Inicie sessão com o método utilizado ao criar a conta.",
        );
        return;
      }

      if (!result) {
        setError("Não foi possível criar a conta. Verifique os dados.");
        return;
      }

      await saveSecret(result.secret);
      posthogClient.capture("register", { method: "Credentials" });
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
        <Text as="label" htmlFor="register-name">
          Nome
        </Text>
        <Input
          id="register-name"
          type="text"
          autoComplete="given-name"
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </Field>

      <Field className="gap-1">
        <Text as="label" htmlFor="register-last-name">
          Apelido
        </Text>
        <Input
          id="register-last-name"
          type="text"
          autoComplete="family-name"
          placeholder="Apelido"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </Field>

      <Field className="gap-1">
        <Text as="label" htmlFor="register-email">
          Email
        </Text>
        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="nome@exemplo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Field>

      <Field className="gap-1">
        <Text as="label" htmlFor="register-password">
          Palavra-passe
        </Text>
        <Input
          id="register-password"
          type="password"
          autoComplete="new-password"
          placeholder="Mínimo de 8 caracteres"
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
          Registar
        </Text>
      </Button>
    </form>
  );
};
