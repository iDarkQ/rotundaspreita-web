import { Divider } from "@/app/_components/divider";
import { ReactNode } from "react";
import { SocialAuthButtons } from "@/app/login/components/social-auth-buttons";

interface Props {
  children: ReactNode;
  footer: ReactNode;
  mode: "login" | "register";
}

export const AuthMethods = ({ children, footer, mode }: Props) => (
  <div className="flex w-full max-w-3xl flex-col gap-6">
    <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
      <div className="flex-1">{children}</div>
      <Divider text="ou" className="lg:hidden" />
      <Divider
        orientation="vertical"
        text="ou"
        className="hidden lg:flex lg:self-stretch"
      />
      <div className="flex flex-1 items-center">
        <SocialAuthButtons mode={mode} />
      </div>
    </div>
    {footer}
  </div>
);
