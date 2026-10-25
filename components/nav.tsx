"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { StingIconCircle } from "@/components/sting-logo";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 0);
      setPastHero(y > window.innerHeight * 0.85);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const overHero = isHome && !pastHero;
  const glass = isHome && pastHero;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-14 transition-all duration-300",
        overHero && "bg-transparent",
        glass && "backdrop-blur-md bg-background/75 border-b border-border/20",
        !isHome && "bg-background",
        !isHome && scrolled && "border-b border-border/40",
      )}
    >
      <div className="mx-auto max-w-270 h-full px-6 md:px-0 flex items-center justify-between">
        <Link href="/"><StingIconCircle size={40} /></Link>

        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className={cn(
            "transition-colors cursor-pointer",
            overHero ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
