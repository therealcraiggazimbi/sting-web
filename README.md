<img src="public/assets/platform/sting-og.png" alt="Sting Runner — become a Sting runner, set your schedule, and earn money delivering" style="width: 100%; height: auto;" />

# Sting Runner

**Sting Runner** is the application and onboarding site for people who want to become a delivery runner for **Sting**, an on-demand delivery platform in South Africa. It's not a separate product — it's the runner-facing surface of Sting, sharing one Clerk project and one Convex deployment with the Sting customer mobile app (see [`convex/README.md`](convex/README.md)).

A runner signs up, completes a 6-step application (personal details, province and nearest partner store, payment details, vehicle information, and compliance documents), and Sting reviews it before approving. Once approved, runners pick up orders from Sting's partner stores (currently Checkers LiquorShop branches) and deliver them, working as independent contractors who set their own schedule.

## What this app includes

- The public marketing home page and runner application funnel for `sting.delivery`
- A custom Clerk email + verification-code auth flow (no social sign-in, no Clerk-hosted pages)
- A render-blocking auth/onboarding gate (`components/auth-provider.tsx` + `components/junction-screen.tsx`) that holds on a splash screen until it knows whether to show the real page or redirect to `/onboarding` — mirrors the mobile app's own junction screen
- The 6-step runner registration flow (`app/onboarding/`), writing to the shared Convex deployment's `runners.ts` mutations
- An application-status screen (pending / approved / rejected) shown to runners who've already applied
- Structured data (JSON-LD), `llms.txt`/`llms-full.txt`, and metadata tuned for both search engines and AI agents
- Sentry error monitoring, Vercel Analytics, and Vercel Speed Insights

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Convex (client only — this repo does not own the schema or functions)
- Clerk
- Framer Motion
- Radix UI + shadcn-based components
- Zod
- Sentry (`@sentry/nextjs`)
- Vercel Analytics and Speed Insights

## Package manager

This project uses **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`), not npm or yarn.

```bash
pnpm install
```

## Required external services

### Clerk

Clerk handles authentication. This app must point at the **same Clerk project** the Sting mobile app uses — one Clerk identity, told apart by the shared `users.isCustomer` / `users.isRunner` flags (see `convex/README.md`), not by separate Clerk projects. You will need:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

### Convex

Convex powers the backend this app talks to — but **this repo does not own that deployment's schema or functions**. They live in the Sting mobile repo. Read [`convex/README.md`](convex/README.md) before touching anything under `convex/` here: running `npx convex dev` or `npx convex deploy` from this repo would overwrite the real backend with this folder's near-empty placeholder.

You will need:

- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_CONVEX_SITE_URL`

### Sentry

Error monitoring is wired up via `@sentry/nextjs`. See [`SENTRY_SETUP.md`](SENTRY_SETUP.md) for the full setup. You will need:

- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_AUTH_TOKEN` (for uploading source maps on build)

## Environment setup

Create a local environment file:

```bash
touch .env.local
```

Example shape:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site

NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

Do **not** set `CONVEX_DEPLOYMENT` here — see `convex/README.md` for why.

## Run the app locally

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Useful scripts

```bash
pnpm dev          # start the Next.js dev server
pnpm build        # production build
pnpm start        # run the production build
pnpm lint         # eslint
pnpm test         # run the Vitest suite once
pnpm test:watch   # run Vitest in watch mode
```

Vitest, Testing Library, and `convex-test` are installed and configured (`vitest.config.ts`, `vitest.setup.ts`), but no test files have been written for this app yet.

## High-level project structure

```text
app/                       Next.js app routes
app/_components/           Home page: hero, application-status, home-gate
app/onboarding/            The 6-step runner application flow
app/legal/                 Privacy policy and terms
app/sso-callback/          OAuth redirect landing page
components/                Nav, auth modal/provider, junction screen, shadcn-based UI
components/seo/            JSON-LD structured data
convex/                    Hand-typed references only — does not own the schema (see convex/README.md)
lib/convex/                Hand-typed Convex function references, kept in sync by hand with the mobile repo
lib/validation/            Zod schemas for the registration form
lib/onboarding/            Country/phone-number picker data
public/                    Static assets, brand files, llms.txt / llms-full.txt
```

## Product flow from the current codebase

1. A visitor lands on the public marketing home page.
2. Signing in/up opens a custom email + verification-code modal (Clerk under the hood).
3. Once signed in, the auth gate checks `Clerk user.unsafeMetadata.onboardingComplete`: not yet onboarded sends them straight to `/onboarding`, already onboarded shows their application status instead of the marketing page.
4. `/onboarding` walks through personal info (including setting the Clerk `firstName`/`lastName` the mobile app also uses), province, store, payment details, vehicle info, and compliance documents.
5. Convex (owned by the mobile repo) stores the application and reviews it; `runnerVerifications.status` tracks pending/approved/rejected.
6. Once approved, the runner operates through functionality that lives outside this repo (the mobile app / future runner tooling) — this app's job ends at a completed, approved application.

## Notes for contributors

- Convex-specific guidance lives in `convex/_generated/ai/guidelines.md` — but remember this repo doesn't own the schema (`convex/README.md`).
- Client-side validation in `lib/validation/registrationSchema.ts` is kept in sync **by hand** with the mobile repo's `convex/schema.ts` and `convex/runners.ts` validators — there's no shared package, so a change to one side needs the other updated too.
