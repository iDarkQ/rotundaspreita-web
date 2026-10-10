"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { USER_REGISTRATION_STATUS } from "@/app/_constants/user-registration-status";
import { registerUser } from "@/app/_services/user-service";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { saveSecret } from "@/app/login/server/save-secret";
import { RouteNames } from "@/app/_utils/route-names";
import { useState } from "react";
import { posthogClient } from "@/app/_lib/instrumentation-client";

interface Props {
  mode: "login" | "register";
}

export const SocialAuthButtons = ({ mode }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const result = await registerUser(tokenResponse);

        if (
          result?.status === USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED
        ) {
          setError(
            "Já existe uma conta registada com este email. Inicie sessão com o método utilizado ao criar a conta.",
          );
          return;
        }

        if (!result) {
          setError(
            "Não foi possível iniciar sessão com Google. Tente novamente.",
          );
          return;
        }

        if (result.status === USER_REGISTRATION_STATUS.SUCCESS) {
          setError(null);
          posthogClient.capture(mode, { method: "Google" });
          await saveSecret(result.secret);
          router.push(RouteNames.PANEL);
          router.refresh();
        }
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("Não foi possível iniciar sessão com Google. Tente novamente.");
      setLoading(false);
    },
    onNonOAuthError: () => setLoading(false),
  });

  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        variant="outlined"
        className="c-border text-neutral! flex h-(--btn-height) w-full items-center justify-start gap-3 px-4"
        onClick={() => {
          setError(null);
          setLoading(true);
          login();
        }}
        loading={loading}
      >
        <FcGoogle aria-hidden="true" size={20} />
        <Text as="span" className="flex-1 text-center">
          {mode === "register" ? "Registar com Google" : "Continuar com Google"}
        </Text>
      </Button>

      {error && (
        <Text as="p" className="text-error!">
          {error}
        </Text>
      )}
    </div>
  );
};
