import Link from "next/link";
import { requireSession } from "@/lib/get-session";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  return (
    <div className="min-h-svh">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <nav className="flex gap-4">
          <Link href="/dashboard" className="font-semibold">Dashboard</Link>
          <Link href="/settings" className="text-muted-foreground">Settings</Link>
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{session.user.email}</span>
          <SignOutButton />
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
