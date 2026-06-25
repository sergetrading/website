"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll wrapper — same dependency-free pattern used by the About and
 * Services sections (IntersectionObserver + CSS) so the whole page animates
 * consistently.
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

const EMAIL = "info@crestmont.consulting";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-32 md:py-48 overflow-hidden"
    >
      {/* faint top hairline to separate from the section above without a hard edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gray-300)/0.2)] to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Built for the few.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 mx-auto max-w-xl text-lg md:text-xl leading-relaxed text-[hsl(var(--gray-300)/0.85)]">
            If the challenge is real and the stakes are high, we should talk.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-12 block text-base md:text-lg tracking-[0.15em] text-[hsl(var(--gray-300)/0.9)] underline-offset-4 transition-colors duration-300 hover:text-[hsl(var(--foreground))] hover:underline"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {EMAIL}
          </a>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-[hsl(var(--gray-300)/0.5)]">
            By introduction or enquiry · Paphos, Cyprus
          </p>
        </Reveal>
      </div>
    </section>
  );
}
