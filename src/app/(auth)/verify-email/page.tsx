import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResendVerification } from "@/components/auth/resend-verification";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "" } = await searchParams;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Check your inbox</CardTitle>
        <CardDescription>
          We sent a verification link{email ? ` to ${email}` : ""}. Click it to activate your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResendVerification email={email} />
      </CardContent>
    </Card>
  );
}
