"use client";

import React from "react";
import { Reveal, MaskReveal } from "@/components/ui/motion";

const EMAIL = "info@crestmont.consulting";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-32 md:py-48 overflow-hidden"
    >
      {/* brass hairline divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brass)/0.4)] to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
        <h2 className="font-serif text-5xl md:text-7xl font-normal leading-[1.04] tracking-[-0.02em]">
          <MaskReveal delay={60}>
            Built for the <span className="italic">few.</span>
          </MaskReveal>
        </h2>

        <Reveal delay={160}>
          <p className="mt-6 mx-auto max-w-xl text-lg md:text-xl leading-relaxed text-[hsl(var(--gray-300)/0.85)]">
            If the challenge is real and the stakes are high, we should talk.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-12 inline-block text-base md:text-lg tracking-[0.15em] text-[hsl(var(--gray-300)/0.9)] transition-colors duration-300 hover:text-[hsl(var(--foreground))]"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <span className="relative inline-block">
              {EMAIL}
              {/* brass underline draws left-to-right on hover */}
              <span
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[hsl(var(--brass))] transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden
              />
            </span>
          </a>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-[hsl(var(--gray-300)/0.5)]">
            By introduction or enquiry · Paphos, Cyprus
          </p>
        </Reveal>
      </div>
    </section>
  );
}
