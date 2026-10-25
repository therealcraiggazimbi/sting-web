# Sentry Setup Instructions

## Installation

Run the following command to install Sentry for Next.js:

```bash
pnpm add @sentry/nextjs
```

## Environment Variables

Add to your `.env.local` and deployed environment:

```
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

Get your DSN from: https://sentry.io/settings/account/projects/

## What's Included

### `/lib/sentry/`
- **config.ts** - Initializes Sentry (disabled in development to save quota)
- **logger.ts** - Provides error/message capture functions
- **index.ts** - Exports everything

## Usage

### Capturing Errors

```typescript
import { captureError } from '@/lib/sentry';

try {
  // your code
} catch (error) {
  captureError(error, {
    tags: { location: 'onboarding' },
    context: { userId: user.id },
  });
}
```

### Async Error Wrapper

```typescript
import { withErrorCapture } from '@/lib/sentry';

const result = await withErrorCapture(
  () => myAsyncFunction(),
  { userId: user.id },
  defaultFallback // optional fallback value
);
```

## Key Features

- ✅ **Dev-friendly**: Disabled in development to avoid wasting Sentry quota
- ✅ **Minimal logging**: Only logs to console in dev, minimal in production
- ✅ **User context**: Automatically track which user triggered errors
- ✅ **Breadcrumbs**: Track user actions leading to errors
