# Better Auth Starter

A production-ready Next.js 16 authentication starter with email/password, OAuth, email verification, and account management — all wired up and ready to deploy.

**Features**

- Email/password signup and login with **required email verification**
- Password reset via email
- Google OAuth
- Protected routes with server-side session validation
- Account settings: update name, change password, view and revoke sessions
- Rate limiting on auth endpoints
- Console email fallback for zero-config local development

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript |
| Auth | Better Auth 1.6.12 |
| Database | Drizzle ORM + Neon serverless Postgres |
| Email | Resend + React Email |
| UI | shadcn/ui (Base UI) + Tailwind CSS v4 |
| Forms | react-hook-form + Zod |
| Env validation | @t3-oss/env-nextjs |
| Testing | Vitest |

---

## Quick Start

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd better-auth-starter
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Copy the environment file**

   ```bash
   # macOS / Linux
   cp .env.example .env

   # Windows
   copy .env.example .env
   ```

4. **Fill in your environment variables** — see [Environment Variables](#environment-variables) below.

5. **Create a Neon database**

   - Go to [neon.tech](https://neon.tech) and create a new project.
   - **Do not enable "Neon Auth"** — Better Auth handles authentication; only the raw Postgres connection string is needed.
   - Copy the connection string into `DATABASE_URL`.

6. **Push the database schema**

   ```bash
   pnpm drizzle-kit push
   ```

7. **Start the dev server**

   ```bash
   pnpm dev
   ```

   The app is available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Required | Description | Where to get it |
|---|---|---|---|
| `DATABASE_URL` | Yes | Neon Postgres connection string | [neon.tech](https://neon.tech) |
| `BETTER_AUTH_SECRET` | Yes | Random secret for signing sessions. Generate: `openssl rand -base64 32` | Generate locally |
| `BETTER_AUTH_URL` | Yes | Base URL of the app (`http://localhost:3000` in dev) | — |
| `NEXT_PUBLIC_APP_URL` | Yes | Same base URL, exposed to the browser | — |
| `RESEND_API_KEY` | No (dev) / Yes (prod) | Resend API key for sending emails | [resend.com](https://resend.com) |
| `EMAIL_FROM` | Yes | Sender address on a domain verified in Resend | Your verified Resend domain |
| `GOOGLE_CLIENT_ID` | No* | Google OAuth client ID | [Google Cloud Console](https://console.cloud.google.com) |
| `GOOGLE_CLIENT_SECRET` | No* | Google OAuth client secret | Google Cloud Console |

\* The Google OAuth vars are optional: if unset, the provider is skipped and the "Continue with Google" button simply won't work until they're added. Email/password auth works without them.

---

## Getting OAuth Credentials

### Google

1. Open [Google Cloud Console](https://console.cloud.google.com) and create or select a project.
2. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
3. Choose **Web application**.
4. Under **Authorized redirect URIs**, add:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google` (production)
5. Under **Authorized JavaScript origins**, add `http://localhost:3000` (and your production origin).
6. Copy the **Client ID** and **Client Secret** into `.env`.

---

## Email (Resend)

In **development**, if `RESEND_API_KEY` is not set, verification and password-reset links are printed to the server console. You can complete the full auth flow locally without a Resend account.

For **production** (or to test real email delivery in dev):

1. Create an account at [resend.com](https://resend.com).
2. Generate an API key and add it to `RESEND_API_KEY`.
3. In Resend, go to **Domains → Add Domain**, add your domain, and create the DNS records it shows (SPF/DKIM). Once verified, set `EMAIL_FROM` to an address on that domain (e.g. `noreply@yourdomain.com`). The sandbox address `onboarding@resend.dev` works for quick testing but only delivers to your own Resend account email.

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start the production server |
| `pnpm test` | Run the test suite with Vitest |
| `pnpm drizzle-kit push` | Push the Drizzle schema to the database |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/               # Public auth routes
│   │   ├── signup/
│   │   ├── login/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (dashboard)/          # Protected routes
│   │   ├── dashboard/
│   │   └── settings/
│   ├── api/auth/[...all]/    # Better Auth catch-all handler
│   ├── layout.tsx
│   └── page.tsx              # Landing page
├── components/
│   ├── auth/                 # Auth form components
│   ├── settings/             # Account settings components
│   └── ui/                   # shadcn/ui primitives
├── lib/
│   ├── auth.ts               # Better Auth server config
│   ├── auth-client.ts        # Better Auth browser client
│   ├── get-session.ts        # requireSession() server helper
│   ├── db/
│   │   ├── index.ts          # Drizzle + Neon client
│   │   └── schema.ts         # user / session / account / verification tables
│   └── email/
│       ├── resend.ts         # Send helper with console fallback
│       └── templates/        # React Email templates
├── env.ts                    # @t3-oss/env-nextjs schema
└── proxy.ts                  # Next.js middleware (optimistic redirects)
```

---

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add all environment variables from `.env.example` in the Vercel project settings.
4. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain (e.g. `https://your-domain.com`).
5. Update the OAuth callback URL in Google Cloud Console to include the production URL.
6. Push the schema to the production database:

   ```bash
   # Point DATABASE_URL at the production Neon connection string, then:
   pnpm drizzle-kit push
   ```

   Alternatively, add `pnpm drizzle-kit push` as a build command in Vercel so it runs on every deploy.

---

## Troubleshooting

**`pnpm.overrides` for `better-call` and `kysely`**

`package.json` pins `better-call@1.3.5` and `kysely@0.28.17` via `pnpm.overrides`. These are required for Better Auth 1.6.12 to build correctly. Do not remove or change these overrides; doing so will cause build failures.

**Emails not sending in development**

If `RESEND_API_KEY` is not set, the app intentionally falls back to logging email links to the server console (`stdout`). Check your terminal output for verification and password-reset URLs. This is expected behaviour — no action needed for local dev.

**`NEXT_PUBLIC_APP_URL` vs `BETTER_AUTH_URL`**

Both must be set to the same base URL. `BETTER_AUTH_URL` is used server-side by Better Auth; `NEXT_PUBLIC_APP_URL` is the browser-accessible equivalent used in client-side redirect logic.
