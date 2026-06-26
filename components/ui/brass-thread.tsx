"use client";

import React, { useEffect, useState } from "react";

/**
 * The brass thread, made into navigation.
 *
 * It started as a decorative line; here it becomes the site's spine AND its
 * wayfinding. A fixed vertical thread on the left margin, hidden over the hero,
 * fading in once you enter the content. Each section is a node; the active one
 * glows and names itself, the fill rises to meet it, and a click travels there.
 * No conventional navbar — the red thread *is* the orientation.
 *
 * Desktop only (lg+) — on narrow screens the margin can't hold it without
 * clutter, and the page is short enough to simply scroll.
 */

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "services", label: "Practice" },
  { id: "method", label: "Method" },
  { id: "contact", label: "Enquiry" },
] as const;

export function ThreadNav() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  // Reveal the thread only once the hero is behind us.
  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active node = whichever section currently sits across the viewport middle.
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = SECTIONS.findIndex((s) => s.id === e.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  const fill = (active / (SECTIONS.length - 1)) * 100;

  return (
    <nav
      aria-label="Sections"
      className={`fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul className="relative flex flex-col gap-12">
        {/* faint track + brass fill that rises to the active node */}
        <span
          className="absolute left-[3px] top-1.5 bottom-1.5 w-px bg-[hsl(var(--brass)/0.16)]"
          aria-hidden
        />
        <span
          className="absolute left-[3px] top-1.5 w-px bg-gradient-to-b from-[hsl(var(--brass)/0.4)] to-[hsl(var(--brass))] transition-[height] duration-700 ease-out"
          style={{ height: `calc((100% - 0.75rem) * ${fill / 100})` }}
          aria-hidden
        />

        {SECTIONS.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.id} className="relative">
              <button
                type="button"
                onClick={() => go(s.id)}
                className="group flex items-center gap-4"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`relative h-[7px] w-[7px] shrink-0 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "border-transparent bg-[hsl(var(--brass))] shadow-[0_0_8px_1px_hsl(var(--brass)/0.6)]"
                      : "border-[hsl(var(--brass)/0.5)] bg-transparent group-hover:border-[hsl(var(--brass))]"
                  }`}
                />
                <span
                  className={`whitespace-nowrap text-[0.625rem] uppercase tracking-[0.35em] transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-[hsl(var(--foreground))] opacity-100"
                      : "-translate-x-1 text-[hsl(var(--gray-300)/0.7)] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
