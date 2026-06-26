"use client";

import React from "react";
import { Reveal, MaskReveal } from "@/components/ui/motion";

/**
 * Practice — the three disciplines.
 *
 * Deliberately NOT the left-rail vertical list used by About and Method: these
 * are three *parallel* disciplines, not a sequence, so they're set as a
 * horizontal triptych and carry no 01/02/03 numerals (numbering would imply an
 * order that isn't there — Method earns its numerals because it genuinely is a
 * sequence). The section sits on the raised "stage" ground so two adjacent
 * content modules never read as one flat sheet. The brass thread is split into
 * three short caps, one over each column.
 */

const disciplines = [
  {
    title: "Strategy",
    body: "Where to play and how to win — direction set with the clarity to act on it, not decks that gather dust.",
  },
  {
    title: "Advisory",
    body: "A trusted counsel in the room when the decisions are large and the margin for error is gone.",
  },
  {
    title: "Transformation",
    body: "Change that holds — built into the organisation, measured in years, and made to last.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-[hsl(var(--background-raised))] text-[hsl(var(--foreground))] py-32 md:py-48 overflow-hidden"
    >
      {/* brass hairline divider — the thread, topping the section as everywhere */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brass)/0.4)] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        {/* Full-width header — a different archetype from the rail sections */}
        <Reveal>
          <span
            className="flex items-center gap-3 text-xs font-light uppercase tracking-[0.5em] text-[hsl(var(--gray-300)/0.7)]"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <span className="h-px w-6 bg-[hsl(var(--brass)/0.6)]" aria-hidden />
            What&nbsp;We&nbsp;Do
          </span>
        </Reveal>

        {/* Single-line headline — breaks the "plain line / italic line" cadence
            the rail sections share; the emphasis lands inline instead. */}
        <h2 className="mt-8 max-w-3xl font-serif text-4xl md:text-5xl font-normal leading-[1.08] tracking-[-0.02em]">
          <MaskReveal delay={100}>
            Three disciplines, held to{" "}
            <span className="italic text-[hsl(var(--brass))]">one standard.</span>
          </MaskReveal>
        </h2>

        {/* The triptych — columns divided by hairline rules, not boxes */}
        <div className="mt-16 grid grid-cols-1 gap-y-14 md:mt-24 md:grid-cols-3 md:gap-y-0">
          {disciplines.map((d, i) => {
            const isFirst = i === 0;
            const isLast = i === disciplines.length - 1;
            const edge = [
              "md:px-10",
              isFirst ? "md:pl-0" : "",
              isLast ? "md:pr-0" : "",
              isFirst ? "" : "md:border-l md:border-[hsl(var(--gray-300)/0.14)]",
            ].join(" ");

            return (
              <Reveal key={d.title} delay={180 + i * 110}>
                <article className={`group h-full ${edge}`}>
                  {/* brass cap — a short thread over the column; widens + brightens
                      on hover. A block element, so it tracks the column padding. */}
                  <span
                    className="block h-px w-10 bg-[hsl(var(--brass)/0.55)] transition-all duration-500 ease-out group-hover:w-20 group-hover:bg-[hsl(var(--brass))]"
                    aria-hidden
                  />
                  <h3 className="mt-7 font-serif text-2xl md:text-3xl font-normal tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-1">
                    {d.title}
                  </h3>
                  <p className="mt-5 text-base md:text-lg leading-relaxed text-[hsl(var(--gray-300)/0.85)]">
                    {d.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
