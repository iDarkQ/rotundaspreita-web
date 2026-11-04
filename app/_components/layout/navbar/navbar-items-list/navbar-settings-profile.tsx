"use client";

import { Button } from "@/app/_components/button";
import { ChangePasswordForm } from "@/app/_components/layout/navbar/navbar-items-list/change-password-form";
import { SetupPasswordForm } from "@/app/_components/layout/navbar/navbar-items-list/setup-password-form";
import { useNavbarManager } from "@/app/_components/layout/navbar/providers/navbar-manager";
import { Text } from "@/app/_components/text";
import { useState } from "react";

export const NavbarSettingsProfile = () => {
  const { user, hasPassword, setHasPassword } = useNavbarManager();
  const [showPasswordSetup, setShowPasswordSetup] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <Text as="h4">{user?.name}</Text>
        <Text>{user?.email}</Text>
      </div>

      {hasPassword ? (
        <ChangePasswordForm />
      ) : showPasswordSetup ? (
        <SetupPasswordForm onSuccess={() => setHasPassword(true)} />
      ) : user?.isGoogleAccount ? (
        <div className="flex flex-col gap-2">
          <Text>
            Defina uma palavra-passe para iniciar sessão também com o seu email.
            Poderá continuar a utilizar o Google.
          </Text>
          <Button
            type="button"
            variant="text"
            className="text-primary self-start underline"
            onClick={() => setShowPasswordSetup(true)}
          >
            Definir palavra-passe
          </Button>
        </div>
      ) : (
        <Text>Esta conta não tem uma palavra-passe configurada.</Text>
      )}
    </div>
  );
};
