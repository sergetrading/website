"use client";

import React from "react";
import { Reveal, MaskReveal } from "@/components/ui/motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-32 md:py-48 overflow-hidden"
    >
      {/* brass hairline — the single thread that runs through every divider */}
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
                About&nbsp;Us
              </span>
            </Reveal>
          </div>

          {/* Right column — content */}
          <div className="md:col-span-8 max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-normal leading-[1.08] tracking-[-0.02em]">
              <MaskReveal delay={100}>Some firms chase scale.</MaskReveal>
              <MaskReveal delay={190} className="italic">
                We chose precision.
              </MaskReveal>
            </h2>

            <div className="mt-10 space-y-8 text-lg md:text-xl leading-relaxed text-[hsl(var(--gray-300)/0.9)]">
              <Reveal delay={200}>
                <p>
                  Crestmont Consulting works with a small circle of founders,
                  owners, and decision-makers operating at the level where the
                  stakes are real and the margin for error is gone. We turn
                  complexity into clear, decisive action — quietly, and without
                  compromise.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <p>
                  We don&apos;t publish client lists. The relationships we build
                  are measured in years, not engagements.
                </p>
              </Reveal>

              <Reveal delay={360}>
                <p>
                  We take on a limited number of engagements each year. Crestmont
                  is not for everyone — for the few it is built for,{" "}
                  <span className="font-serif italic text-[hsl(var(--brass))]">
                    that is precisely the point.
                  </span>
                </p>
              </Reveal>
            </div>

            {/* Founder's signature — the section closes on a personal note */}
            <Reveal delay={440}>
              <figure className="mt-14">
                <span
                  className="h-px w-10 bg-[hsl(var(--brass)/0.5)] block"
                  aria-hidden
                />
                <span
                  className="mt-6 block origin-left -rotate-[3deg] text-5xl md:text-6xl leading-[0.9] text-[hsl(var(--brass))]"
                  style={{
                    fontFamily: "var(--font-signature), cursive",
                    // the finest nib lines — keep the ink barely raised, no glow
                    textShadow: "0 1px 1px hsl(var(--background)/0.45)",
                  }}
                >
                  Sergej Hoffmann
                </span>
                <figcaption className="mt-4">
                  <span
                    className="block text-xs font-light uppercase tracking-[0.35em] text-[hsl(var(--gray-300)/0.7)]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Founder &amp; CEO
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
