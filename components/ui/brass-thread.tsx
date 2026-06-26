"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * The brass thread, made literal.
 *
 * Until now "the thread" was only a metaphor — the brass hairlines that top
 * every section. This draws a single continuous vertical line down the left
 * content edge that GROWS with scroll, physically stitching About → Services →
 * Contact into one piece. A faint glowing node rides the leading edge: the one
 * point of light on the page, justified as the head of the thread being pulled
 * through.
 *
 * Aligned to the same `max-w-6xl` + `px-6/px-10` gutter the sections use, so it
 * lands exactly on their left rail. Desktop only (md+) — on narrow screens the
 * margin is too tight for it to read as anything but clutter. Decorative, so it
 * is hidden from assistive tech and lets every click pass through.
 */
export function ThreadedSections({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress as the block travels through the viewport. The thread reaches the
  // foot of the page slightly before the very end, so Contact resolves on a
  // completed line rather than one still visibly drawing.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.9"],
  });

  // Long, heavy settle — the line follows the scroll with luxurious lag rather
  // than snapping 1:1 to the wheel.
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    mass: 0.5,
  });

  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 hidden md:block"
      >
        <div className="relative mx-auto h-full max-w-6xl px-6 md:px-10">
          {/* faint full-height track the thread is drawn over */}
          <div className="absolute inset-y-0 left-6 w-px bg-[hsl(var(--brass)/0.1)] md:left-10">
            {/* the drawn thread — brass intensifying toward the leading edge */}
            <motion.div
              style={{ height: reduce ? "100%" : height }}
              className="absolute inset-x-0 top-0 w-px bg-gradient-to-b from-[hsl(var(--brass)/0.15)] via-[hsl(var(--brass)/0.6)] to-[hsl(var(--brass))]"
            >
              {/* glowing node at the head of the thread */}
              {!reduce && (
                <span className="absolute -bottom-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[hsl(var(--brass))] shadow-[0_0_10px_2px_hsl(var(--brass)/0.7)]" />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
