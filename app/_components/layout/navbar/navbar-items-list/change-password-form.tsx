"use client";

import { Button } from "@/app/_components/button";
import { Field } from "@/app/_components/field";
import { Input } from "@/app/_components/input";
import { Text } from "@/app/_components/text";
import {
  CHANGE_PASSWORD_STATUS,
  ChangePasswordStatus,
} from "@/app/_constants/change-password-status";
import { changePassword } from "@/app/_services/user-service";
import { FormEvent, useRef, useState } from "react";

const MIN_PASSWORD_LENGTH = 8;

const ERROR_MESSAGES: Record<
  Exclude<ChangePasswordStatus, typeof CHANGE_PASSWORD_STATUS.SUCCESS>,
  string
> = {
  [CHANGE_PASSWORD_STATUS.INVALID_CURRENT_PASSWORD]:
    "A palavra-passe atual está incorreta.",
  [CHANGE_PASSWORD_STATUS.INVALID_NEW_PASSWORD]: `A nova palavra-passe deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`,
  [CHANGE_PASSWORD_STATUS.NO_PASSWORD_SET]:
    "Esta conta não tem uma palavra-passe definida.",
  [CHANGE_PASSWORD_STATUS.RATE_LIMITED]:
    "Demasiadas tentativas. Tente novamente mais tarde.",
  [CHANGE_PASSWORD_STATUS.FAILED]:
    "Não foi possível alterar a palavra-passe. Volte a tentar.",
};

export const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const isSubmitting = useRef(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting.current) return;

    setError(null);
    setSuccess(false);

    if (newPassword.trim().length < MIN_PASSWORD_LENGTH) {
      setError(ERROR_MESSAGES[CHANGE_PASSWORD_STATUS.INVALID_NEW_PASSWORD]);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    isSubmitting.current = true;
    setLoading(true);

    try {
      const status = await changePassword({ currentPassword, newPassword });

      if (status !== CHANGE_PASSWORD_STATUS.SUCCESS) {
        setError(ERROR_MESSAGES[status]);
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess(true);
    } catch {
      setError(ERROR_MESSAGES[CHANGE_PASSWORD_STATUS.FAILED]);
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
      <Text as="h4">Alterar palavra-passe</Text>

      <Field className="gap-1">
        <Text as="label" htmlFor="current-password">
          Palavra-passe atual
        </Text>
        <Input
          id="current-password"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
        />
      </Field>

      <Field className="gap-1">
        <Text as="label" htmlFor="new-password">
          Nova palavra-passe
        </Text>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          placeholder={`Mínimo de ${MIN_PASSWORD_LENGTH} caracteres`}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
        />
      </Field>

      <Field className="gap-1">
        <Text as="label" htmlFor="confirm-password">
          Confirmar nova palavra-passe
        </Text>
        <Input
          id="confirm-password"
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

      {success && (
        <div role="status">
          <Text as="p" className="text-success!">
            Palavra-passe alterada com sucesso.
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
