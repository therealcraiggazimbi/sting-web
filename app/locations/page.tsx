import type { Metadata } from "next";
import { LocationsList } from "./_components/locations-list";

export const metadata: Metadata = {
  title: "Locations",
  description: "Cities where Sting delivers cold drinks and alcohol on demand.",
  alternates: {
    canonical: "https://sting.delivery/locations",
  },
};

export default function LocationsPage() {
  return (
    <main className="flex-1 w-full">
      <div className="mx-auto w-full max-w-270 px-6 md:px-12 py-16 md:py-24">

        {/* Eyebrow */}
        <div className="sr-eyebrow mb-5 sr-reveal">
          <span className="num">01</span>
          <span className="inline-block w-px h-3 bg-primary-line" />
          <span className="lbl">Where we deliver</span>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3 sr-reveal"
          style={{ animationDelay: "0.08s" }}
        >
          Available locations
        </h1>
        <p
          className="text-muted-foreground text-base mb-12 max-w-md sr-reveal"
          style={{ animationDelay: "0.16s" }}
        >
          Cold drinks and alcohol delivered on demand to these cities.
        </p>

        {/* List card */}
        <div
          className="sr-card px-6 md:px-8 sr-reveal"
          style={{ animationDelay: "0.24s" }}
        >
          <LocationsList />
        </div>

      </div>
    </main>
  );
}
