"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Shared scroll-reveal primitives built on Framer Motion. They carry the
 * couture motion language: an expo ease-out curve, a faint blur-in, and a
 * clip-mask "rise from behind an edge" for headlines.
 *
 * Robustness is the point of this rewrite: content must NEVER be stuck hidden.
 *   - `prefers-reduced-motion` -> rendered in final state, no transform/blur.
 *   - deep-linked / mid-page refresh (element mounts already scrolled past the
 *     top) -> the in-view observer would never fire, so we reveal immediately.
 *   - no JavaScript at all -> a <noscript> rule in the root layout forces every
 *     [data-reveal] element visible.
 */

// Expo-out: fast departure, long luxurious settle. One curve, shared everywhere.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RevealProps = {
  children: React.ReactNode;
  delay?: number; // ms
  className?: string;
};

/**
 * Drives the shared reveal state for one element. Returns a ref to attach to
 * the observed node and `shown`, which is true once the element is in view —
 * or immediately if motion is reduced or the element has already scrolled past.
 */
function useReveal(amount: number) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (reduce) {
      setFallback(true);
      return;
    }
    const el = ref.current;
    // Mounted already above the fold? The once-only observer can't fire for it,
    // so reveal it now rather than leave it invisible.
    if (el && el.getBoundingClientRect().top < 0) setFallback(true);
  }, [reduce]);

  return { ref, shown: reduce || inView || fallback };
}

/** Fade + blur + rise. For paragraphs, labels, and grouped content. */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, shown } = useReveal(0.25);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      data-reveal
      className={className}
      initial={false}
      animate={
        shown
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 24, filter: "blur(8px)" }
      }
      transition={{ duration: 1.1, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Clip-mask reveal — the headline rises into view from behind its own bottom
 * edge, reading as type being *set* rather than faded in. Use on Fraunces
 * headlines.
 */
export function MaskReveal({ children, delay = 0, className = "" }: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, shown } = useReveal(0.3);

  // Reduced motion: render the heading plainly, no clip/transform.
  if (reduce) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  // The OUTER span is observed and stays in normal flow at the heading's real
  // position; the clip happens here (overflow-hidden). The inner span carries
  // the transform, so the observed element is never the one pushed off-screen.
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className="block overflow-hidden pb-[0.12em]"
    >
      <motion.span
        data-reveal
        className={`block ${className}`}
        initial={false}
        animate={{ y: shown ? "0%" : "115%" }}
        transition={{ duration: 1.15, ease: EASE, delay: delay / 1000 }}
      >
        {children}
      </motion.span>
    </span>
  );
}
