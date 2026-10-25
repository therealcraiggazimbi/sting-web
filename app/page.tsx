import type { Metadata } from "next";
import { Hero } from "@/app/_components/hero";
import { JsonLd, buildWebsiteJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://sting.delivery",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={buildWebsiteJsonLd()} />
      <Hero />
    </>
  );
}
