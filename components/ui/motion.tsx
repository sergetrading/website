"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Shared scroll-reveal primitives built on Framer Motion. They replace the
 * hand-rolled IntersectionObserver `Reveal` that used to live (duplicated) in
 * every section, and add the couture motion language: an expo ease-out curve,
 * a faint blur-in, and a clip-mask "rise from behind an edge" for headlines.
 *
 * Everything honours `prefers-reduced-motion` — when set, content renders in
 * its final state with no transform/blur.
 */

// Expo-out: fast departure, long luxurious settle. The single curve used
// everywhere so the whole page shares one rhythm.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RevealProps = {
  children: React.ReactNode;
  delay?: number; // ms, to match the old API
  className?: string;
};

/** Fade + blur + rise. For paragraphs, labels, and grouped content. */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Clip-mask reveal — the headline rises into view from behind its own bottom
 * edge. This is the signature move: it reads as type being *set* rather than
 * faded in. Use on Fraunces headlines.
 */
export function MaskReveal({ children, delay = 0, className = "" }: RevealProps) {
  const reduce = useReducedMotion();

  // Reduced motion: render the heading plainly, no clip/transform.
  if (reduce) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  // The OUTER span is what Framer observes — it stays in normal flow at the
  // heading's real position, so `whileInView` fires reliably. The clip happens
  // here (overflow-hidden); the inner span carries the transform via variants,
  // so the observed element is never the one that's been pushed off-screen.
  return (
    <motion.span
      className="block overflow-hidden pb-[0.12em]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.span
        className={`block ${className}`}
        variants={{ hidden: { y: "115%" }, shown: { y: "0%" } }}
        transition={{ duration: 1.15, ease: EASE, delay: delay / 1000 }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
