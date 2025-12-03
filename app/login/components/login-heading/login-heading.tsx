import { LoginHeadingDescription } from "@/app/login/components/login-heading/login-heading-description";
import { LoginHeadingTitle } from "@/app/login/components/login-heading/login-heading-title";

export const LoginHeading = () => (
  <div className="flex flex-col items-center justify-center">
    <LoginHeadingTitle />
    <LoginHeadingDescription />
  </div>
);
