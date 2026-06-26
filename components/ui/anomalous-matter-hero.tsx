"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Three.js (~150kb gz) is purely decorative, so we keep it out of the critical
// bundle entirely: load the scene client-side only, after first paint. The
// fallback matches the background so there's no flash.
const GenerativeArtScene = dynamic(
  () =>
    import("./generative-art-scene").then((m) => m.GenerativeArtScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[hsl(var(--background))]" />
    ),
  }
);

/**
 * Scroll-linked progress for the first viewport (0 at top -> 1 after one
 * screen). Dependency-free: a passive scroll listener throttled with rAF, so it
 * only touches `transform`/`opacity` and stays on the GPU compositor. Honours
 * `prefers-reduced-motion` by pinning progress at 0 (no movement).
 */
function useHeroScroll() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = window.innerHeight || 1;
        setProgress(Math.min(1, Math.max(0, window.scrollY / h)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

export interface AnomalousMatterHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function AnomalousMatterHero({
  title = "Observation Log: Anomaly 7",
  subtitle = "Matter in a state of constant, beautiful flux.",
  description = "A new form of digital existence has been observed. It responds to stimuli, changes form, and exudes an unknown energy. Further study is required.",
}: AnomalousMatterHeroProps) {
  const p = useHeroScroll();

  return (
    <section
      role="banner"
      className="relative w-full h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden"
    >
      {/* 3D scene gently zooms + drifts and dissolves into the black as you scroll */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `scale(${1 + p * 0.14}) translateY(${p * 6}vh)`,
          opacity: 1 - p * 0.7,
        }}
      >
        <GenerativeArtScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.7)] to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-20 md:pb-32 text-center">
        <div
          className="will-change-transform"
          style={{
            transform: `translateY(${-p * 12}vh)`,
            opacity: 1 - Math.min(1, p * 1.4),
          }}
        >
          <div className="max-w-3xl px-4 animate-fade-in-long">
          {/* Eyebrow — set in the same Montserrat / brass-hairline grammar that
              every section eyebrow repeats below, so the hero *introduces* the
              page's vocabulary instead of speaking a leftover mono dialect. The
              hairline is the first appearance of the brass thread that then runs
              the length of the page. The proposition (not this label) carries
              the h1 — it's the meaningful line. */}
          <p
            className="flex flex-col items-center gap-4 text-[0.625rem] md:text-xs font-light uppercase tracking-[0.4em] text-[hsl(var(--gray-300)/0.85)]"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <span className="h-px w-8 bg-[hsl(var(--brass)/0.6)]" aria-hidden />
            <span>{title}</span>
          </p>
          <h1 className="mt-6 font-serif text-3xl md:text-5xl font-normal leading-[1.08] tracking-[-0.02em]">
            {subtitle}
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-[hsl(var(--gray-300)/0.8)]">
            {description}
          </p>
          </div>
        </div>
      </div>

      {/* Scroll cue — gently pulses, fades out as soon as the user scrolls */}
      <div
        className="absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: Math.max(0, 1 - p * 3) }}
        aria-hidden
      >
        <span
          className="text-[0.625rem] font-light uppercase tracking-[0.5em] text-[hsl(var(--gray-300)/0.6)]"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Scroll
        </span>
        <svg
          className="animate-scroll-cue motion-reduce:animate-none"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(var(--gray-300) / 0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
