"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { preordersApi } from "@/lib/convex/preorders";
import { FlipCountdown } from "@/components/flip-countdown";

// Fallback shown until the Convex query resolves.
// 1 November 2026, 00:00 SAST (UTC+2).
const FALLBACK_LAUNCH_AT_MS = Date.UTC(2026, 9, 31, 22, 0, 0);

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// Separate component that calls useQuery — only mounted when a ConvexProvider
// is in the tree (i.e. NEXT_PUBLIC_CONVEX_URL is present at runtime).
function LaunchInfoFetcher({
  onLaunchAtMs,
}: {
  onLaunchAtMs: (ms: number) => void;
}) {
  const launchInfo = useQuery(preordersApi.getLaunchInfo);
  if (launchInfo?.launchAtMs != null) {
    onLaunchAtMs(launchInfo.launchAtMs);
  }
  return null;
}

export function HeroContent() {
  // Whether a Convex URL is configured — evaluated at module load time on the
  // client, always false during static prerendering (no env var in build env).
  const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

  const [launchAtMs, setLaunchAtMs] = useState<number>(FALLBACK_LAUNCH_AT_MS);

  const target = useMemo(() => new Date(launchAtMs), [launchAtMs]);

  return (
    <>
      {/* Only mount the Convex-connected fetcher when a provider is present */}
      {hasConvex && <LaunchInfoFetcher onLaunchAtMs={setLaunchAtMs} />}

      <motion.div
        className="text-left max-w-2xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight"
          variants={item}
        >
          Delivering cold drinks on demand.
        </motion.h1>

        <motion.p
          className="mt-4 text-base md:text-lg text-white/90 leading-relaxed"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7), 0 2px 16px rgba(0,0,0,0.5)" }}
          variants={item}
        >
          Sting is launching. 1,000 bottles in your pocket, cold drinks delivered before the ice melts.
        </motion.p>

        <motion.div className="mt-10" variants={item}>
          <p className="text-xs font-bold tracking-[0.2em] text-white/60">LAUNCHING IN</p>
          <div className="mt-3">
            <FlipCountdown target={target} />
          </div>
          <p className="mt-4 text-sm text-white/60">Target launch: 1 November 2026</p>
        </motion.div>
      </motion.div>
    </>
  );
}
