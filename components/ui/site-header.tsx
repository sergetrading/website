import React from "react";

/**
 * Fixed brand header — the wordmark stays pinned to the top of the viewport on
 * every section while you scroll. Rendered once at the page level (outside the
 * hero) so it never scrolls away or fades with the sections behind it.
 *
 * `pointer-events-none` so it never blocks clicks/selection on the content
 * underneath; the page background is solid black, so the white wordmark stays
 * legible over every section.
 */
export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
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
