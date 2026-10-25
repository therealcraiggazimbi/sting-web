import { makeFunctionReference } from "convex/server";

/**
 * Hand-typed reference into the sting mobile repo's convex/preorders.ts —
 * the shared Convex deployment this web app talks to (see convex/README.md).
 * PREORDER_LAUNCH_AT_MS there is the single source of truth for the launch
 * date; this just mirrors its query's shape.
 */
export const preordersApi = {
  getLaunchInfo: makeFunctionReference<"query", Record<string, never>, { launchAtMs: number }>(
    "preorders:getLaunchInfo",
  ),
};
