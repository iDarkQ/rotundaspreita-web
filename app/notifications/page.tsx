import { Section } from "@/app/_components/section";
import { ReminderSettingsForm } from "@/app/notifications/components/reminder-settings-form";
import { fetchReminderPreferences } from "@/app/_services/reminder-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notificações e Lembretes",
  description:
    "Gira os seus objetivos semanais e os lembretes para a preparação do exame.",
};

export default async function NotificationsPage() {
  const preferences = await fetchReminderPreferences();

  return (
    <Section>
      <ReminderSettingsForm initialPreferences={preferences} />
    </Section>
  );
}
