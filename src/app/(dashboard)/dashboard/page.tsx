import { requireSession } from "@/lib/get-session";

export default async function DashboardPage() {
  const session = await requireSession();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
      <p className="text-muted-foreground">You are signed in as {session.user.email}.</p>
    </div>
  );
}
