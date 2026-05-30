import { Resend } from "resend";
import { render } from "@react-email/components";
import { env } from "@/env";
import { VerifyEmail } from "./templates/verify-email";
import { ResetPassword } from "./templates/reset-password";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

async function deliver(opts: { to: string; subject: string; html: string; devLabel: string; url: string }) {
  if (!resend) {
    console.log(`\n[email:${opts.devLabel}] to=${opts.to}\n${opts.url}\n`);
    return;
  }
  const { data, error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
  if (error) {
    // Resend returns errors in the result rather than throwing — surface them.
    console.error(`[email:error] ${opts.devLabel} to=${opts.to}:`, error);
    throw new Error(`Failed to send ${opts.devLabel} email: ${error.message ?? "unknown error"}`);
  }
  console.log(`[email:sent] ${opts.devLabel} to=${opts.to} id=${data?.id}`);
}

export async function sendVerificationEmail({ to, url }: { to: string; url: string }) {
  const html = await render(VerifyEmail({ url }));
  await deliver({ to, subject: "Verify your email", html, devLabel: "verify", url });
}

export async function sendResetPasswordEmail({ to, url }: { to: string; url: string }) {
  const html = await render(ResetPassword({ url }));
  await deliver({ to, subject: "Reset your password", html, devLabel: "reset", url });
}
