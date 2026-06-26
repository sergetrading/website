"use client";

import React from "react";
import { Reveal, MaskReveal } from "@/components/ui/motion";

const disciplines = [
  {
    no: "01",
    title: "Strategy",
    body: "Where to play and how to win — direction set with the clarity to act on it, not decks that gather dust.",
  },
  {
    no: "02",
    title: "Advisory",
    body: "A trusted counsel in the room when the decisions are large and the margin for error is gone.",
  },
  {
    no: "03",
    title: "Transformation",
    body: "Change that holds — built into the organisation, measured in years, and made to last.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-32 md:py-48 overflow-hidden"
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
                What&nbsp;We&nbsp;Do
              </span>
            </Reveal>
          </div>

          {/* Right column — content */}
          <div className="md:col-span-8 max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-normal leading-[1.08] tracking-[-0.02em]">
              <MaskReveal delay={100}>Three disciplines.</MaskReveal>
              <MaskReveal delay={190} className="italic">
                One standard.
              </MaskReveal>
            </h2>

            {/* List */}
            <div className="mt-12 md:mt-16">
              {disciplines.map((d, i) => (
                <Reveal key={d.no} delay={200 + i * 100}>
                  <div className="group grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-8 py-10 border-t border-[hsl(var(--gray-300)/0.15)] transition-colors duration-500 hover:border-[hsl(var(--brass)/0.5)]">
                    <div className="md:col-span-2">
                      <span className="font-mono text-sm tracking-widest text-[hsl(var(--brass)/0.55)] transition-colors duration-500 group-hover:text-[hsl(var(--brass))]">
                        {d.no}
                      </span>
                    </div>
                    <div className="md:col-span-10">
                      <h3 className="inline-block font-serif text-2xl md:text-3xl font-normal tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                        {d.title}
                        {/* brass underline draws in on hover */}
                        <span
                          className="mt-2 block h-px origin-left scale-x-0 bg-[hsl(var(--brass)/0.7)] transition-transform duration-500 ease-out group-hover:scale-x-100"
                          aria-hidden
                        />
                      </h3>
                      <p className="mt-4 text-base md:text-lg leading-relaxed text-[hsl(var(--gray-300)/0.85)]">
                        {d.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
              {/* closing hairline */}
              <div className="border-t border-[hsl(var(--gray-300)/0.15)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
