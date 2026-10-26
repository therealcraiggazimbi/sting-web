import { query } from "./_generated/server";

/**
 * Returns a deduplicated, sorted list of { city, country } from all active stores.
 * Note: `.withIndex` types will resolve correctly after `npx convex dev` regenerates
 * the schema-aware types. The cast suppresses the stale-generated-types error.
 */
export const activeLocations = query({
  args: {},
  handler: async (ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stores = await (ctx.db.query("stores") as any)
      .withIndex("by_active", (q: any) => q.eq("active", true))
      .collect();

    // Build a SET of unique city+country combos
    const seen = new Set<string>();
    const locations: { city: string; country: string }[] = [];

    for (const store of stores) {
      const key = `${store.city.toLowerCase()}|${store.country.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        locations.push({ city: store.city, country: store.country });
      }
    }

    // Sort alphabetically by country, then city
    locations.sort((a, b) => {
      const byCountry = a.country.localeCompare(b.country);
      return byCountry !== 0 ? byCountry : a.city.localeCompare(b.city);
    });

    return locations;
  },
});
