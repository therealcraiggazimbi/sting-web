import Image from "next/image";
import { cn } from "@/lib/utils";

// Matches the mobile app's (auth) authenticate.tsx header: a circle with a
// 2px primary border and the icon mark centered inside, at the same
// 88px-circle/60px-icon ratio as that screen's logoCircle/logo styles.
// `size` sets the circle's diameter in px (inline style, not a Tailwind
// class, so it isn't limited to sizes present elsewhere in the stylesheet).
export function StingIconCircle({ className, size = 88 }: { className?: string; size?: number }) {
  const iconSize = Math.round(size * (60 / 88));
  return (
    <div
      className={cn("rounded-full border-2 border-primary flex items-center justify-center shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image src="/assets/brand/sting-icon.png" alt="Sting" width={iconSize} height={iconSize} className="object-contain" priority />
    </div>
  );
}

// The icon mark is a single brand color (same hex in both of the mobile
// app's themes — see src/constants/theme.ts), so unlike the old Vaka
// wordmark it doesn't need separate light/dark/over-hero variants.
export function StingLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/assets/brand/sting-icon.png"
      alt="Sting"
      width={60}
      height={60}
      className={cn("object-contain", className)}
      priority
    />
  );
}
