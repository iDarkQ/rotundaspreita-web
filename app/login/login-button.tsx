"use client";

import { Button } from "@/app/_components/button";
import { Text } from "@/app/_components/text";
import { registerUser } from "@/services/user-service";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { redirect } from "next/navigation";
import { saveSecret } from "@/app/login/save-secret";
import { RouteNames } from "@/utils/route-names";

interface Props {
  ip: string;
  agent: string;
}

export const LoginButton = ({ ip, agent }: Props) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const secret = await registerUser(tokenResponse, ip, agent);
      if (secret) {
        await saveSecret(secret);
        redirect(RouteNames.PANEL);
      }
    },
  });

  return (
    <Button
      className="gap-2 flex flex-row items-center justify-center"
      onClick={() => login()}
    >
      <Text as="h4" className="text-white">
        Autenticar com o Google
      </Text>
      <FaGoogle className="text-white" size={20} />
    </Button>
  );
};
