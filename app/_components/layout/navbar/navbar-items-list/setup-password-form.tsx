"use client";

import { Button } from "@/app/_components/button";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import { SET_PASSWORD_STATUS } from "@/app/_constants/set-password-status";
import { setAccountPassword } from "@/app/_services/user-service";
import { FormEvent, useRef, useState } from "react";

interface Props {
  onSuccess: () => void;
}

const MIN_PASSWORD_LENGTH = 8;

export const SetupPasswordForm = ({ onSuccess }: Props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSubmitting = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting.current) return;

    setError(null);
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
      setError("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    isSubmitting.current = true;
    setLoading(true);
    try {
      const result = await setAccountPassword(password);
      if (result === SET_PASSWORD_STATUS.SUCCESS) {
        onSuccess();
        return;
      }
      if (result === SET_PASSWORD_STATUS.ALREADY_SET) {
        setError("Esta conta já tem uma palavra-passe definida.");
        return;
      }
      if (result === SET_PASSWORD_STATUS.INVALID_NEW_PASSWORD) {
        setError("A palavra-passe deve ter pelo menos 8 caracteres.");
        return;
      }
      setError("Não foi possível definir a palavra-passe. Volte a tentar.");
    } catch {
      setError("Não foi possível definir a palavra-passe. Volte a tentar.");
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
      <Text as="h4">Definir palavra-passe</Text>
      <Field className="gap-1">
        <Text as="label" htmlFor="setup-password">
          Nova palavra-passe
        </Text>
        <Input
          id="setup-password"
          type="password"
          autoComplete="new-password"
          placeholder={`Mínimo de ${MIN_PASSWORD_LENGTH} caracteres`}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </Field>
      <Field className="gap-1">
        <Text as="label" htmlFor="setup-password-confirm">
          Confirmar palavra-passe
        </Text>
        <Input
          id="setup-password-confirm"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </Field>

      {error && (
        <div role="alert">
          <Text as="p" className="text-error!">
            {error}
          </Text>
        </div>
      )}

      <Button type="submit" loading={loading}>
        <Text as="span" className="text-white">
          Guardar palavra-passe
        </Text>
      </Button>
    </form>
  );
};
