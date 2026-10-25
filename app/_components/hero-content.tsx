"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { preordersApi } from "@/lib/convex/preorders";
import { FlipCountdown } from "@/components/flip-countdown";

// Loading-state fallback only, shown for the brief moment before
// preordersApi.getLaunchInfo resolves - convex/preorders.ts's
// PREORDER_LAUNCH_AT_MS in the mobile repo is the actual source of truth,
// so this can never drift from when preorders actually unlock there.
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

export function HeroContent() {
  const launchInfo = useQuery(preordersApi.getLaunchInfo);
  const target = useMemo(
    () => new Date(launchInfo?.launchAtMs ?? FALLBACK_LAUNCH_AT_MS),
    [launchInfo?.launchAtMs],
  );

  return (
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
  );
}
