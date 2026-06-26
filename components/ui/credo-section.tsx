"use client";

import React from "react";
import { MaskReveal, Reveal } from "@/components/ui/motion";

/**
 * The credo — a quiet authority beat that interrupts the rhythm of the rail
 * sections (About / Services / Contact all share the left-eyebrow + right-column
 * grid). This one is centred, set in a single large Fraunces statement on a lot
 * of black: a pause, not a pitch. Authority by restraint, never by bragging —
 * which is why there are no logos, numbers, or client claims here, only a maxim
 * the brand stands behind.
 *
 * Lives inside <ThreadedSections>, so the brass thread keeps drawing straight
 * through it.
 */
export function CredoSection() {
  return (
    <section
      id="credo"
      className="relative w-full overflow-hidden bg-[hsl(var(--background))] py-40 text-[hsl(var(--foreground))] md:py-64"
    >
      {/* brass hairline — same thread that tops every section */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brass)/0.4)] to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        {/* a single short brass mark to open — the thread, gathered to a point */}
        <Reveal>
          <span
            className="mx-auto mb-12 block h-px w-10 bg-[hsl(var(--brass)/0.6)]"
            aria-hidden
          />
        </Reveal>

        <blockquote className="font-serif text-3xl font-normal leading-[1.18] tracking-[-0.015em] md:text-[2.75rem] md:leading-[1.16]">
          <MaskReveal delay={80}>The decisions that matter are made</MaskReveal>
          <MaskReveal delay={170}>by a few, under real weight —</MaskReveal>
          <MaskReveal delay={260}>and judged not by the noise they make,</MaskReveal>
          <MaskReveal delay={350} className="italic text-[hsl(var(--brass))]">
            but by whether they still hold years later.
          </MaskReveal>
        </blockquote>

        <Reveal delay={460}>
          <span
            className="mt-12 block text-xs font-light uppercase tracking-[0.45em] text-[hsl(var(--gray-300)/0.7)]"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            — Crestmont
          </span>
        </Reveal>
      </div>
    </section>
  );
}
