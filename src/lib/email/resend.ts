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
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
}

export async function sendVerificationEmail({ to, url }: { to: string; url: string }) {
  const html = await render(VerifyEmail({ url }));
  await deliver({ to, subject: "Verify your email", html, devLabel: "verify", url });
}

export async function sendResetPasswordEmail({ to, url }: { to: string; url: string }) {
  const html = await render(ResetPassword({ url }));
  await deliver({ to, subject: "Reset your password", html, devLabel: "reset", url });
}
