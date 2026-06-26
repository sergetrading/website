"use client";

import React from "react";
import { Reveal, MaskReveal } from "@/components/ui/motion";

/**
 * The method — the substance an advisory site usually omits. Sophisticated
 * buyers don't want logos; they want to see how the thinking is done. This is
 * the process, told in language rather than diagrams or icons, in the same
 * left-rail grammar as the rest of the page. Roman numerals (not the Arabic
 * 01/02/03 of Practice) so two sequential lists never read as the same module.
 * Sits on the raised "stage" ground — the page's second lifted plane after
 * Credo — so the alternating base/raised rhythm gives the long scroll depth.
 */

const steps = [
  {
    no: "I",
    title: "Listen",
    body: "Before counsel, understanding. We begin in the room with the people who carry the decision — until the real problem, not the presented one, is in focus.",
  },
  {
    no: "II",
    title: "Frame",
    body: "We strip the noise to the few questions that actually move the outcome, and agree precisely what winning looks like.",
  },
  {
    no: "III",
    title: "Decide",
    body: "Options, sharpened to a single recommendation we will stand behind. Not a menu — a judgement.",
  },
  {
    no: "IV",
    title: "Hold",
    body: "We stay until the change is built into the organisation and its people — measured in years, not engagements.",
  },
];

export function MethodSection() {
  return (
    <section
      id="method"
      className="relative w-full bg-[hsl(var(--background-raised))] text-[hsl(var(--foreground))] py-32 md:py-48 overflow-hidden"
    >
      {/* brass hairline divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brass)/0.4)] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16">
          {/* Left rail — eyebrow label */}
          <div className="md:col-span-4">
            <Reveal>
              <span
                className="flex items-center gap-3 text-xs font-light uppercase tracking-[0.5em] text-[hsl(var(--gray-300)/0.7)] md:sticky md:top-24"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <span className="h-px w-6 bg-[hsl(var(--brass)/0.6)]" aria-hidden />
                The&nbsp;Method
              </span>
            </Reveal>
          </div>

          {/* Right column — content */}
          <div className="md:col-span-8 max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-normal leading-[1.08] tracking-[-0.02em]">
              <MaskReveal delay={100}>How an engagement</MaskReveal>
              <MaskReveal delay={190} className="italic">
                begins.
              </MaskReveal>
            </h2>

            <Reveal delay={220}>
              <p className="mt-8 text-lg md:text-xl leading-relaxed text-[hsl(var(--gray-300)/0.9)]">
                The first ninety days set the tenor of everything that follows.
                They are deliberate, and they are few.
              </p>
            </Reveal>

            {/* Sequence */}
            <div className="mt-12 md:mt-16">
              {steps.map((s, i) => (
                <Reveal key={s.no} delay={260 + i * 90}>
                  <div className="group grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-8 py-10 border-t border-[hsl(var(--gray-300)/0.15)] transition-colors duration-500 hover:border-[hsl(var(--brass)/0.5)]">
                    <div className="md:col-span-2">
                      <span className="font-serif text-2xl italic text-[hsl(var(--brass)/0.6)] transition-colors duration-500 group-hover:text-[hsl(var(--brass))]">
                        {s.no}
                      </span>
                    </div>
                    <div className="md:col-span-10">
                      <h3 className="inline-block font-serif text-2xl md:text-3xl font-normal tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                        {s.title}
                        <span
                          className="mt-2 block h-px origin-left scale-x-0 bg-[hsl(var(--brass)/0.7)] transition-transform duration-500 ease-out group-hover:scale-x-100"
                          aria-hidden
                        />
                      </h3>
                      <p className="mt-4 text-base md:text-lg leading-relaxed text-[hsl(var(--gray-300)/0.85)]">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-[hsl(var(--gray-300)/0.15)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
