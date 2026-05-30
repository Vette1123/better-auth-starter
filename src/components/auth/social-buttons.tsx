"use client";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function SocialButtons() {
  async function social(provider: "google") {
    const { error } = await signIn.social({ provider, callbackURL: "/dashboard" });
    if (error) toast.error(error.message ?? "Sign-in failed");
  }
  return (
    <div className="space-y-2">
      <div className="relative py-2 text-center text-xs text-muted-foreground">
        <span className="bg-card px-2">or continue with</span>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => social("google")}
      >
        Continue with Google
      </Button>
    </div>
  );
}
