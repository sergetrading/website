"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll wrapper — same dependency-free pattern used by the About
 * section (IntersectionObserver + CSS) so the whole page animates consistently.
 */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1.2s ease-out ${delay}ms, transform 1.2s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

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
      {/* faint top hairline to separate from the section above without a hard edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gray-300)/0.2)] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16">
          {/* Left rail — eyebrow label */}
          <div className="md:col-span-4">
            <Reveal>
              <span
                className="block text-xs font-light uppercase tracking-[0.5em] text-[hsl(var(--gray-300)/0.7)] md:sticky md:top-24"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                What&nbsp;We&nbsp;Do
              </span>
            </Reveal>
          </div>

          {/* Right column — content */}
          <div className="md:col-span-8 max-w-2xl">
            <Reveal delay={120}>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Three disciplines. One standard.
              </h2>
            </Reveal>

            {/* List */}
            <div className="mt-12 md:mt-16">
              {disciplines.map((d, i) => (
                <Reveal key={d.no} delay={200 + i * 100}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-8 py-10 border-t border-[hsl(var(--gray-300)/0.15)]">
                    <div className="md:col-span-2">
                      <span className="font-mono text-sm tracking-widest text-[hsl(var(--gray-300)/0.5)]">
                        {d.no}
                      </span>
                    </div>
                    <div className="md:col-span-10">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {d.title}
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
