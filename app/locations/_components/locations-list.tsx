import { MapPin } from "lucide-react";

type Location = { city: string; country: string };

// Hardcoded rather than fetched, so this static page does not need a
// ConvexProvider at build time. Not derived from Convex `stores` rows —
// this is the Johannesburg coverage area list given directly by the user.
const ACTIVE_LOCATIONS: Location[] = [
  // Johannesburg (Sandton & Traditional Wealth Suburbs)
  { city: "Sandhurst", country: "South Africa" },
  { city: "Hyde Park", country: "South Africa" },
  { city: "Westcliff", country: "South Africa" },
  { city: "Houghton Estate", country: "South Africa" },
  { city: "Bryanston", country: "South Africa" },
  { city: "Dunkeld", country: "South Africa" },
  { city: "Dunkeld West", country: "South Africa" },
  { city: "Inanda", country: "South Africa" },
  { city: "Atholl", country: "South Africa" },
  { city: "Saxonwold", country: "South Africa" },
  { city: "Parkview", country: "South Africa" },

  // Midrand & Waterfall Corridor
  { city: "Waterfall Estate", country: "South Africa" },
  { city: "Kyalami Estate", country: "South Africa" },
  { city: "Blue Valley Golf & Country Estate", country: "South Africa" },

  // Fourways, Dainfern & Northern Country Estates
  { city: "Blair Atholl", country: "South Africa" },
  { city: "Steyn City", country: "South Africa" },
  { city: "Dainfern Estate", country: "South Africa" },
  { city: "Broadacres", country: "South Africa" },
  { city: "Fourways", country: "South Africa" },
  { city: "Monaghan Farm", country: "South Africa" },
];

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
