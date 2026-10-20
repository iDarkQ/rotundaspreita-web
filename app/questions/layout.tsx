import { verifyOnboardingComplete } from "@/app/_services/user-service";
import { ReactNode } from "react";

export default async function QuestionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  await verifyOnboardingComplete();
  return children;
}
