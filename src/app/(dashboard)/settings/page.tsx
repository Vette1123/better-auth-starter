import { requireSession } from "@/lib/get-session";
import { UpdateNameForm } from "@/components/settings/update-name-form";
import { ChangePasswordForm } from "@/components/settings/change-password-form";
import { SessionsList } from "@/components/settings/sessions-list";

export default async function SettingsPage() {
  const session = await requireSession();
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1">
        <h1 className="font-heading text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, password, and active sessions.
        </p>
      </div>
      <UpdateNameForm initialName={session.user.name} />
      <ChangePasswordForm />
      <SessionsList />
    </div>
  );
}
