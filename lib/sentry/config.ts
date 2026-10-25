import * as Sentry from "@sentry/nextjs";

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const isDev = process.env.NODE_ENV === "development";

export const initSentry = () => {
  Sentry.init({
    dsn: isDev ? undefined : DSN,
    environment: isDev ? "development" : "production",
    tracesSampleRate: isDev ? 0 : 0.1,
    attachStacktrace: true,
    debug: isDev,
    enabled: !isDev,
  });
};

export default Sentry;
