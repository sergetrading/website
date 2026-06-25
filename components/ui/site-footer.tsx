import React from "react";

const EMAIL = "info@crestmont.consulting";

const NAV = [
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const LEGAL = [
  { label: "Legal Notice", href: "/legal-notice" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

/**
 * Slim site footer — same restrained, monochrome language as the rest of the
 * page (black, Montserrat, hairline separators). Re-states the wordmark, a few
 * in-page anchors, the contact email and location, and a copyright line.
 */
export function SiteFooter() {
  return (
    <footer className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
      {/* faint top hairline to match the section dividers above */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gray-300)/0.2)] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-6">
          {/* Wordmark */}
          <div
            className="text-center md:text-left"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <span className="block text-lg md:text-xl font-bold uppercase tracking-[0.4em] leading-none text-[hsl(var(--foreground))]">
              Crestmont
            </span>
            <span className="mt-2 block text-[0.625rem] font-light uppercase tracking-[0.7em] text-[hsl(var(--gray-300)/0.7)]">
              Consulting&nbsp;&nbsp;Ltd
            </span>
          </div>

          {/* In-page navigation */}
          <nav
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            aria-label="Footer"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.25em] text-[hsl(var(--gray-300)/0.8)] transition-colors duration-300 hover:text-[hsl(var(--foreground))]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div
            className="text-center md:text-right"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <a
              href={`mailto:${EMAIL}`}
              className="block text-sm tracking-[0.15em] text-[hsl(var(--gray-300)/0.9)] underline-offset-4 transition-colors duration-300 hover:text-[hsl(var(--foreground))] hover:underline"
            >
              {EMAIL}
            </a>
            <span className="mt-2 block text-[0.625rem] uppercase tracking-[0.35em] text-[hsl(var(--gray-300)/0.5)]">
              Paphos, Cyprus
            </span>
          </div>
        </div>

        {/* lower hairline + copyright & legal */}
        <div
          className="mt-14 pt-8 border-t border-[hsl(var(--gray-300)/0.12)] flex flex-col items-center gap-4 text-center md:flex-row md:justify-between"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          <p className="text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--gray-300)/0.45)]">
            © 2026 Crestmont Consulting Ltd. All rights reserved.
          </p>

          <nav
            className="flex items-center gap-x-8 gap-y-3"
            aria-label="Legal"
          >
            {LEGAL.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--gray-300)/0.6)] transition-colors duration-300 hover:text-[hsl(var(--foreground))]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
