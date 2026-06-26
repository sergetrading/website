"use client";

import React from "react";
import { MaskReveal, Reveal } from "@/components/ui/motion";

/**
 * The credo — the page's single typographic crescendo.
 *
 * Everything else whispers at a steady text-4xl/5xl; this one beat is allowed
 * to be loud: a clamped display size that runs larger than any other headline,
 * centred on a lot of black, opened by an oversized Fraunces quotation mark set
 * in solid brass — the one place besides the founder's signature where the
 * accent is fully present rather than a hairline. It sits on the raised "stage"
 * ground, and a faint warm halo lifts it further still: the crescendo is the
 * page literally stepping up onto a lit plane. Authority by restraint, not
 * bragging: no logos, no numbers, only a maxim the brand stands behind.
 */
export function CredoSection() {
  return (
    <section
      id="credo"
      className="relative w-full overflow-hidden bg-[hsl(var(--background-raised))] py-44 text-[hsl(var(--foreground))] md:py-72"
    >
      {/* brass hairline — same thread that tops every section */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brass)/0.4)] to-transparent" />

      {/* warm halo — the stage under the crescendo. Felt, not seen. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 55% at 50% 42%, hsl(var(--brass) / 0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        {/* Oversized opening quote — solid brass, set in Fraunces like inked
            display type. Pulled tight to the quote it opens. */}
        <Reveal>
          <span
            className="block select-none font-serif text-[5rem] leading-[0.6] text-[hsl(var(--brass))] md:text-[7rem]"
            aria-hidden
          >
            &ldquo;
          </span>
        </Reveal>

        <blockquote className="mt-6 text-balance font-serif font-normal leading-[1.16] tracking-[-0.015em] text-[clamp(1.7rem,4.2vw,3rem)]">
          <MaskReveal delay={80}>The decisions that matter are made</MaskReveal>
          <MaskReveal delay={170}>by a few, under real weight —</MaskReveal>
          <MaskReveal delay={260}>and judged not by the noise they make,</MaskReveal>
          <MaskReveal delay={350} className="italic text-[hsl(var(--brass))]">
            but by whether they still hold years later.
          </MaskReveal>
        </blockquote>

        <Reveal delay={460}>
          <span
            className="mt-14 block text-xs font-light uppercase tracking-[0.45em] text-[hsl(var(--gray-300)/0.7)]"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            &mdash; Crestmont
          </span>
        </Reveal>
      </div>
    </section>
  );
}
