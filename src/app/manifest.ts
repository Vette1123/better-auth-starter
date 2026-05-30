import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: "auth-starter",
    description:
      "Production-ready Next.js auth starter with Better Auth, Neon Postgres, email/password, verification, password reset, and Google OAuth.",
    start_url: "/",
    display: "standalone",
    background_color: BRAND.ink,
    theme_color: BRAND.emerald,
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
