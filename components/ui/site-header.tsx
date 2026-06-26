"use client";

import React, { useEffect, useState } from "react";

/**
 * Fixed brand header — the CRESTMONT wordmark pinned to the top of the viewport.
 *
 * It hides as you read *down* and returns the moment you scroll *up*: the
 * wordmark gets out of the way while you're moving through the content, and is
 * there again the instant you reach for it. At the very top it is always shown.
 *
 * `pointer-events-none` so it never blocks clicks/selection on the content
 * underneath; the gradient scrim keeps the wordmark legible over any section it
 * appears above.
 */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        // Ignore sub-pixel jitter so the wordmark doesn't flicker.
        if (Math.abs(y - last) < 6) return;
        // Near the top the wordmark always stays; below it, hide on the way
        // down and reveal on the way up.
        setHidden(y > 80 && y > last);
        last = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-500 ease-out motion-reduce:transition-none ${
        hidden ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/*
        Gradient scrim: solid black at the very top, fading to transparent
        lower down. Any section text that scrolls up into this band dissolves
        into the background before it reaches the wordmark, so the logo always
        stays clean and legible.
      */}
      <div
        className="absolute inset-x-0 top-0 h-44 md:h-48 bg-gradient-to-b from-[hsl(var(--background))] from-35% via-[hsl(var(--background)/0.85)] to-transparent"
        aria-hidden
      />

      <div
        className="relative flex flex-col items-center pt-8 md:pt-10 text-center"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        <span className="text-2xl md:text-4xl font-bold uppercase tracking-[0.4em] leading-none text-[hsl(var(--foreground))]">
          Crestmont
        </span>
        <span className="mt-3 text-[0.625rem] md:text-xs font-light uppercase tracking-[0.8em] text-[hsl(var(--gray-300)/0.8)]">
          Consulting&nbsp;&nbsp;Ltd
        </span>
      </div>
    </header>
  );
}
