import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";

export interface ErrorContext {
  userId?: string;
  email?: string;
  [key: string]: any;
}

export interface ErrorMetadata {
  context?: ErrorContext;
  tags?: Record<string, string>;
  extra?: Record<string, any>;
  level?: Sentry.SeverityLevel;
}

export const captureError = (
  error: Error | string,
  metadata?: ErrorMetadata
): string => {
  if (isDev) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[Sentry] ${errorMessage}`, metadata);
    return "dev-mode-no-capture";
  }

  const sentryId = Sentry.captureException(error, {
    contexts: metadata?.context ? { app: metadata.context } : undefined,
    tags: metadata?.tags,
    extra: metadata?.extra,
    level: metadata?.level || "error",
  });

  return sentryId;
};

export const captureMessage = (
  message: string,
  level: Sentry.SeverityLevel = "info",
  metadata?: ErrorMetadata
): string => {
  if (isDev) {
    console.log(`[Sentry] [${level.toUpperCase()}] ${message}`, metadata);
    return "dev-mode-no-capture";
  }

  const sentryId = Sentry.captureMessage(message, {
    level,
    contexts: metadata?.context ? { app: metadata.context } : undefined,
    tags: metadata?.tags,
    extra: metadata?.extra,
  });

  return sentryId;
};

export const setUserContext = (
  userId: string,
  email?: string,
  metadata?: Record<string, any>
) => {
  if (isDev) {
    console.log("[Sentry] Set user context:", { userId, email, ...metadata });
    return;
  }

  Sentry.setUser({
    id: userId,
    email,
    ...metadata,
  });
};

export const clearUserContext = () => {
  if (isDev) {
    console.log("[Sentry] Cleared user context");
    return;
  }

  Sentry.setUser(null);
};

export const addBreadcrumb = (
  message: string,
  category: string = "user-action",
  level: Sentry.SeverityLevel = "info",
  data?: Record<string, any>
) => {
  if (isDev) {
    console.log(`[Breadcrumb] [${category}] ${message}`, data || "");
    return;
  }

  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data,
    timestamp: Date.now() / 1000,
  });
};

export const withErrorCapture = async <T>(
  fn: () => Promise<T>,
  context?: ErrorContext,
  fallback?: T
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    if (isDev) {
      console.error(
        "[Sentry] Caught error in async function:",
        errorObj.message
      );
    } else {
      captureError(errorObj, {
        context,
        level: "error",
      });
    }

    if (fallback !== undefined) {
      return fallback;
    }

    throw error;
  }
};

export const withErrorCaptureSync = <T>(
  fn: () => T,
  context?: ErrorContext,
  fallback?: T
): T => {
  try {
    return fn();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    if (isDev) {
      console.error("[Sentry] Caught error in sync function:", errorObj.message);
    } else {
      captureError(errorObj, {
        context,
        level: "error",
      });
    }

    if (fallback !== undefined) {
      return fallback;
    }

    throw error;
  }
};
