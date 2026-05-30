import { Body, Button, Container, Head, Heading, Html, Text } from "@react-email/components";

export function ResetPassword({ url }: { url: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", background: "#f6f6f6", padding: "24px" }}>
        <Container style={{ background: "#fff", borderRadius: 8, padding: 32 }}>
          <Heading>Reset your password</Heading>
          <Text>Click the button below to choose a new password.</Text>
          <Button href={url} style={{ background: "#111", color: "#fff", padding: "12px 20px", borderRadius: 6 }}>
            Reset password
          </Button>
          <Text style={{ color: "#888", fontSize: 12 }}>If you didn&apos;t request this, ignore this email.</Text>
        </Container>
      </Body>
    </Html>
  );
}
