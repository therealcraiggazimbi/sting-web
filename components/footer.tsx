"use client";

import Link from "next/link";
import { StingLogo } from "@/components/sting-logo";
import { Heart } from "lucide-react";

const LEGAL = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/company/sting-delivery", label: "LinkedIn" },
  { href: "https://www.instagram.com/sting.delivery/", label: "Instagram" },
  { href: "https://x.com/stingdelivery", label: "X" },
];

const LINK_CLASS = "text-sm text-muted-foreground hover:text-foreground transition-colors leading-relaxed";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background relative z-10 flex flex-col">
      <div className="mx-auto w-full max-w-270 px-6 md:px-0 py-12 flex-1">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Logo + description */}
          <div className="flex flex-col gap-3 max-w-xs shrink-0">
            <Link href="/"><StingLogo /></Link>
            <p className="text-sm text-muted-foreground leading-relaxed pt-4">
              Delivering cold drinks on demand. Alcohol, mixers, and ice to your door, before the ice melts.
            </p>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Legal</p>
            <div className="h-px bg-border/60" />
            <ul className="flex flex-col">
              {LEGAL.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={`${LINK_CLASS} block py-2`}>
                    {label}
                  </Link>
                  <div className="h-px bg-border/40" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="mx-auto w-full max-w-270 px-6 md:px-0 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            &copy; {year} Made with <Heart size={12} className="text-rose-500 fill-rose-500" /> in Africa.
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
