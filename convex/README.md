# This repo does not own this Convex deployment

sting-runner is a second frontend client of the **same** Convex deployment
and the **same** Clerk project as the `sting` React Native app
(`abundant-possum-919`, team `sting` — see `.env.local`). One Clerk
identity, one Convex `users` row per person, told apart by that row's
`role` field (`'customer'` set by the mobile app, `'runner'` set by this
app's registration flow).

The deployment's schema and every function (`convex/schema.ts`,
`convex/runners.ts`, `convex/orders.ts`, etc.) live in the `sting` mobile
repo, not here — that's the one codebase Convex pushes to this deployment
from.

## Do not run `npx convex dev` or `npx convex deploy` in this repo

There's no `CONVEX_DEPLOYMENT` set in `.env.local` on purpose. If this
folder ever did push, Convex replaces the *entire* function set on the
target deployment with whatever's in this local `convex/` folder — which
today is just copied `_generated` type output, no real functions. Running
either command here would wipe out every function the mobile app's backend
depends on (orders, wallet, payments, notifications, the registration
mutations this app calls...).

## `_generated/` is a manual copy, not generated here

`api.d.ts`, `api.js`, `dataModel.d.ts`, `server.d.ts`, and `server.js` are
copied from the `sting` repo's `convex/_generated/` after a change lands
there, so this app gets typed `useQuery(api.runners.getMyRegistration)` /
`useMutation(api.runners.saveVerificationDetails)` calls without owning the
schema. When a registration-related function changes in the mobile repo,
re-copy those five files from there.

## What this app actually calls

Everything this registration flow needs lives in the mobile repo's
`convex/runners.ts`:

- `api.runners.getMyRegistration` — the signed-in user's whole application
  (verification, payment details, vehicle, documents), with signed URLs
  for any uploaded files.
- `api.runners.generateUploadUrl` — short-lived upload URL for a document
  photo; POST the file there, then pass the returned storage id to
  `saveVehicleInfo`/`saveDocuments`.
- `api.runners.saveVerificationDetails` — step 1 (personal info); also
  what flips `users.role` to `'runner'`.
- `api.runners.savePaymentDetails` — step 2 (bank/billing details).
- `api.runners.saveVehicleInfo` — step 3 (vehicle + inspection report +
  operating license).
- `api.runners.saveDocuments` — step 4 (selfie, licence, criminal record
  check).

See `lib/validation/registrationSchema.ts` in this repo for the client-side
field options (vehicle type isn't a closed list upstream, but billing type,
bank account type, etc. are) — kept in sync by hand with the validators
exported from the mobile repo's `convex/schema.ts`, the same convention
that repo already uses for its own onboarding fields.
