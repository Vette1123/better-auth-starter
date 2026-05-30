import Link from "next/link";
import {
  ArrowRight,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSession } from "@/lib/get-session";

const chips = [
  { icon: ShieldCheck, label: "Email verification" },
  { icon: KeyRound, label: "Password reset" },
  { icon: MailCheck, label: "Resend emails" },
  { icon: LockKeyhole, label: "Google OAuth" },
];

export default async function Home() {
  const session = await getSession();
  const firstName = session?.user.name?.split(" ")[0];

  return (
    <main className="bg-aurora relative flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5 font-heading text-lg font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LockKeyhole className="size-4" />
          </span>
          better-auth-starter
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full",
              )}
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-full",
              )}
            >
              Log in
            </Link>
          )}
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="size-3.5 text-primary" />
          {session
            ? `You're signed in${firstName ? `, ${firstName}` : ""}`
            : "Production-ready auth starter"}
        </span>

        <h1 className="font-heading text-5xl font-semibold leading-[1.05] sm:text-6xl">
          Authentication
          <br />
          you can ship today.
        </h1>

        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          Email &amp; password with verification, password reset, and Google
          sign-in — built on Better Auth, Neon, and Drizzle.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-xl px-7 text-[0.95rem]",
                )}
              >
                Go to dashboard
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/settings"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-xl px-7 text-[0.95rem]",
                )}
              >
                Account settings
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-xl px-7 text-[0.95rem]",
                )}
              >
                Get started
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-xl px-7 text-[0.95rem]",
                )}
              >
                Log in
              </Link>
            </>
          )}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur"
            >
              <c.icon className="size-3.5 text-primary" />
              {c.label}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
