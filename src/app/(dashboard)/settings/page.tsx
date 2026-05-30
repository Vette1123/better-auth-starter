import { requireSession } from "@/lib/get-session";
import { UpdateNameForm } from "@/components/settings/update-name-form";
import { ChangePasswordForm } from "@/components/settings/change-password-form";
import { SessionsList } from "@/components/settings/sessions-list";

export default async function SettingsPage() {
  const session = await requireSession();
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <UpdateNameForm initialName={session.user.name} />
      <ChangePasswordForm />
      <SessionsList />
    </div>
  );
}
