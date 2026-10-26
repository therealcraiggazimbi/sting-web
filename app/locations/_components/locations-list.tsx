import { MapPin } from "lucide-react";

type Location = { city: string; country: string };

// Hardcoded rather than fetched, so this static page does not need a
// ConvexProvider at build time. Mirrors `stores` rows with isActive:true in
// the Convex dev deployment as of 2026-10-26 (none currently) — update this
// list by hand whenever a store's isActive flag changes.
const ACTIVE_LOCATIONS: Location[] = [];

export function LocationsList() {
  const locations = ACTIVE_LOCATIONS;

  if (locations.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground text-sm">No active locations yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {locations.map((loc: Location, i: number) => (
        <div
          key={`${loc.city}-${loc.country}`}
          className="group flex items-center justify-between py-5 border-b border-border/40 last:border-0 sr-reveal"
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          <div className="flex items-center gap-3">
            <MapPin
              size={15}
              className="text-primary shrink-0 opacity-70"
              strokeWidth={1.8}
            />
            <span className="text-sm font-medium text-foreground">{loc.city}</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
            {loc.country}
          </span>
        </div>
      ))}
    </div>
  );
}
