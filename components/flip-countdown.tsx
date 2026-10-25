"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CARD_WIDTH = 32;
const CARD_HEIGHT = 46;
const FLIP_DURATION = 0.19;
const CARD_COLOR = "#181818";

function getRemaining(target: Date) {
  const diffMs = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad2(value: number) {
  return Math.max(0, Math.min(99, value)).toString().padStart(2, "0");
}

/**
 * One split-flap tile. The face underneath always shows the current digit;
 * the flap on top holds the previous digit and rotates away (fading out
 * near the end of its fall) to reveal it — same trick as the mobile app's
 * src/components/FlipCountdown.tsx.
 */
function FlipDigit({ digit }: { digit: string }) {
  const [displayDigit, setDisplayDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);
  const prevDigit = useRef(digit);

  useEffect(() => {
    if (digit === prevDigit.current) return;
    prevDigit.current = digit;
    setFlipping(true);
  }, [digit]);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT, backgroundColor: CARD_COLOR }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span suppressHydrationWarning className="text-[26px] font-bold text-white">{digit}</span>
      </div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: CARD_COLOR, transformPerspective: 500, backfaceVisibility: "hidden" }}
        initial={false}
        animate={flipping ? { rotateX: -92, opacity: [1, 1, 0] } : { rotateX: 0, opacity: 1 }}
        transition={flipping ? { duration: FLIP_DURATION, ease: "easeIn" } : { duration: 0 }}
        onAnimationComplete={() => {
          if (!flipping) return;
          setDisplayDigit(digit);
          setFlipping(false);
        }}
      >
        <span suppressHydrationWarning className="text-[26px] font-bold text-white">{displayDigit}</span>
      </motion.div>
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black/30" />
    </div>
  );
}

function FlipGroup({ value, label }: { value: number; label: string }) {
  const padded = pad2(value);
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        <FlipDigit digit={padded[0]} />
        <FlipDigit digit={padded[1]} />
      </div>
      <span className="mt-2 text-[11px] font-semibold tracking-wider text-white/60">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="mt-2.5 px-1 text-xl font-bold text-white/60">:</span>;
}

/** A flip-clock-style countdown to `target`, re-computed every second. */
export function FlipCountdown({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex items-start">
      <FlipGroup value={remaining.days} label="DAYS" />
      <Colon />
      <FlipGroup value={remaining.hours} label="HRS" />
      <Colon />
      <FlipGroup value={remaining.minutes} label="MIN" />
      <Colon />
      <FlipGroup value={remaining.seconds} label="SEC" />
    </div>
  );
}
