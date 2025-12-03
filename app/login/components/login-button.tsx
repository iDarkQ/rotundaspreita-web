"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { registerUser } from "@/app/_services/user-service";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { redirect } from "next/navigation";
import { saveSecret } from "@/app/login/server/save-secret";
import { RouteNames } from "@/app/_utils/route-names";
import { useState } from "react";

interface Props {
  ip: string;
  agent: string;
}

export const LoginButton = ({ ip, agent }: Props) => {
  const [loading, setLoading] = useState(false);
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const secret = await registerUser(tokenResponse, ip, agent);
      if (secret) {
        await saveSecret(secret);
        redirect(RouteNames.PANEL);
      }
      setLoading(false);
    },
  });

  return (
    <Button
      className="flex flex-row items-center justify-center gap-2"
      onClick={() => {
        setLoading(true);
        login();
      }}
      loading={loading}
    >
      <Text as="h4" className="text-white">
        Autenticar com o Google
      </Text>
      <FaGoogle className="text-white" size={20} />
    </Button>
  );
};
