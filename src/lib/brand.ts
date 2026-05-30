/**
 * Single source of truth for the better-auth-starter brand mark.
 *
 * The mark is an emerald "lock-keyhole" badge that mirrors the header logo in
 * `app/page.tsx`. It is rendered statically as `app/icon.svg` and reused by the
 * generated `apple-icon` and Open Graph routes via `svgToDataUri`.
 */

export const BRAND = {
  name: "better-auth-starter",
  author: "Mohamed Gado",
  site: "https://mohamedgado.com",
  // Emerald scale (hue ~163) matching the `--primary` token in globals.css.
  emeraldLight: "#34d399",
  emerald: "#10b981",
  emeraldDark: "#047857",
  keyhole: "#065f46",
  ink: "#0a0a0a",
} as const;

/** Renders the brand badge as a standalone SVG string at the given size. */
export function brandBadgeSvg({
  size = 512,
  radius = 120,
}: { size?: number; radius?: number } = {}): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 512 512" role="img" aria-label="${BRAND.name}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ba-bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${BRAND.emeraldLight}"/>
      <stop offset=".5" stop-color="${BRAND.emerald}"/>
      <stop offset="1" stop-color="${BRAND.emeraldDark}"/>
    </linearGradient>
    <linearGradient id="ba-sheen" x1="256" y1="0" x2="256" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff" stop-opacity=".25"/>
      <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="${radius}" fill="url(#ba-bg)"/>
  <rect width="512" height="512" rx="${radius}" fill="url(#ba-sheen)"/>
  <path d="M184 242 V198 a72 72 0 0 1 144 0 V242" fill="none" stroke="#fff" stroke-width="36" stroke-linecap="round"/>
  <rect x="148" y="236" width="216" height="150" rx="38" fill="#fff"/>
  <circle cx="256" cy="300" r="24" fill="${BRAND.keyhole}"/>
  <path d="M248 306 h16 l-4 46 a4 4 0 0 1 -8 0 z" fill="${BRAND.keyhole}"/>
</svg>`;
}

/** Base64 `data:` URI for embedding an SVG string as an `<img src>` in satori. */
export function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
