import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold">better-auth-starter</h1>
      <p className="max-w-md text-muted-foreground">
        A production-ready Next.js auth starter: email/password, verification, reset, Google &amp; GitHub OAuth.
      </p>
      <div className="flex gap-3">
        <Link href="/signup" className={buttonVariants({ size: "lg" })}>
          Get started
        </Link>
        <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Log in
        </Link>
      </div>
    </main>
  );
}
