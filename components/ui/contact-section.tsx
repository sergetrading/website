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

      <div className="relative mx-auto max-w-3xl px-6 md:px-10 text-center">
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

        {/* The brass thread gathers to a point and descends into the card —
            the closing resolves the line that ran the length of the page. */}
        <Reveal delay={240}>
          <span
            className="mx-auto mt-16 block h-16 w-px bg-gradient-to-b from-transparent to-[hsl(var(--brass)/0.55)]"
            aria-hidden
          />
        </Reveal>

        {/* The calling card — a hairline plaque that gives the enquiry a home.
            No fill, just a whisper of lift off the black so it reads as a
            surface rather than floating text. */}
        <Reveal delay={300}>
          <div className="relative mx-auto max-w-md border border-[hsl(var(--gray-300)/0.16)] bg-[hsl(var(--foreground)/0.015)] px-8 py-12 md:px-12">
            {/* the node where the thread meets the top edge */}
            <span
              className="absolute -top-[3.5px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-[hsl(var(--brass))] shadow-[0_0_9px_1px_hsl(var(--brass)/0.65)]"
              aria-hidden
            />

            <span
              className="block text-[0.625rem] font-light uppercase tracking-[0.45em] text-[hsl(var(--gray-300)/0.7)]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Enquiries
            </span>

            <a
              href={`mailto:${EMAIL}`}
              className="group mt-7 inline-block text-lg md:text-2xl tracking-[0.04em] text-[hsl(var(--foreground))] transition-colors duration-300"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <span className="relative inline-block">
                {EMAIL}
                {/* brass underline draws left-to-right on hover */}
                <span
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[hsl(var(--brass))] transition-transform duration-500 ease-out group-hover:scale-x-100"
                  aria-hidden
                />
              </span>
            </a>

            {/* short brass rule separates the action from its details */}
            <span
              className="mx-auto my-9 block h-px w-12 bg-[hsl(var(--brass)/0.3)]"
              aria-hidden
            />

            {/* structured footer — location and availability, hairline-split */}
            <div
              className="flex items-center justify-center gap-4 text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--gray-300)/0.72)]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <span>Paphos, Cyprus</span>
              <span
                className="h-3 w-px bg-[hsl(var(--gray-300)/0.25)]"
                aria-hidden
              />
              <span>By introduction or enquiry</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
