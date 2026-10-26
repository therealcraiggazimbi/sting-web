"use client";

import { useQuery } from "convex/react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { api as _api } from "@/convex/_generated/api";
import { MapPin } from "lucide-react";

// Cast needed until `npx convex dev` regenerates types after schema addition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const api = _api as any;

type Location = { city: string; country: string };

export function LocationsList() {
  const locations = useQuery(api.stores.activeLocations) as
    | Location[]
    | undefined;

  if (locations === undefined) {
    // Loading state — skeleton rows
    return (
      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="py-5 border-b border-border/50 last:border-0">
            <div
              className="h-4 rounded bg-muted animate-pulse"
              style={{ width: `${120 + i * 30}px`, animationDelay: `${i * 80}ms` }}
            />
          </div>
        ))}
      </div>
    );
  }

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
