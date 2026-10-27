import { verifyOnboardingComplete } from "@/app/_services/user-service";
import { ReactNode } from "react";

export default async function TestLayout({
  children,
}: {
  children: ReactNode;
}) {
  await verifyOnboardingComplete();
  return children;
}
