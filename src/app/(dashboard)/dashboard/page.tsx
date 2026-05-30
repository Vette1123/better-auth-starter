import Link from "next/link";
import { BadgeCheck, CircleUser, Mail, Settings } from "lucide-react";
import { requireSession } from "@/lib/get-session";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await requireSession();
  const verified = session.user.emailVerified;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-semibold">
          Welcome back, {session.user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your account at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/60">
          <CardHeader className="px-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CircleUser className="size-5" />
            </div>
            <CardTitle className="pt-2 text-base">{session.user.name}</CardTitle>
            <CardDescription>Signed-in user</CardDescription>
          </CardHeader>
        </Card>

        <Card className="rounded-2xl border-border/60">
          <CardHeader className="px-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="size-5" />
            </div>
            <CardTitle className="pt-2 text-base break-all">
              {session.user.email}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              {verified ? (
                <>
                  <BadgeCheck className="size-4 text-primary" />
                  Email verified
                </>
              ) : (
                "Email not verified"
              )}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="rounded-2xl border-border/60">
          <CardHeader className="px-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Settings className="size-5" />
            </div>
            <CardTitle className="pt-2 text-base">Account settings</CardTitle>
            <CardDescription>Update your profile, password, and sessions.</CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <Link
              href="/settings"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-lg",
              )}
            >
              Open settings
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
