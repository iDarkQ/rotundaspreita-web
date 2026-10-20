import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { fetchReminderPreferences } from "@/app/_services/reminder-service";
import { RouteNames } from "@/app/_utils/route-names";
import { OnboardingWizard } from "@/app/onboarding/components/onboarding-wizard";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const user = await fetchLoggedUser();
  if (!user) redirect(RouteNames.LOGIN);
  if (user.onboardingCompleted) redirect(RouteNames.PANEL);

  const preferences = await fetchReminderPreferences();

  return (
    <main className="bg-background fixed inset-0 z-20 overflow-y-auto px-5 py-6">
      <OnboardingWizard
        firstName={user.name.split(" ")[0]}
        initialPreferences={preferences}
      />
    </main>
  );
}
