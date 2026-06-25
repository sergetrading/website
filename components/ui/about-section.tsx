"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * A reveal-on-scroll wrapper that fades its children up once they enter the
 * viewport. Kept dependency-free (IntersectionObserver + CSS) to match the
 * existing hero, which animates purely with CSS keyframes.
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
      { threshold: 0.25 }
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

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-32 md:py-48 overflow-hidden"
    >
      {/* faint top hairline to separate from the hero without a hard edge */}
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
                About&nbsp;Us
              </span>
            </Reveal>
          </div>

          {/* Right column — content */}
          <div className="md:col-span-8 max-w-2xl">
            <Reveal delay={120}>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                Some firms chase scale. We chose precision.
              </h2>
            </Reveal>

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
                  <span className="font-bold text-[hsl(var(--foreground))]">
                    that is precisely the point.
                  </span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
