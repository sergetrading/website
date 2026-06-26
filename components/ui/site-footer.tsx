const LEGAL = [
  { label: "Legal Notice", href: "/legal-notice" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

/**
 * The close-out signature. The page opens on the centred CRESTMONT wordmark and
 * now ends on it too — a quiet bookend so the footer reads as the brand signing
 * off, not as generic small print. Same restrained language as the rest (warm
 * black, Montserrat caps, brass hairlines); the wordmark is set smaller and
 * dimmer than the header so it whispers the name rather than repeating it loud.
 */
export function SiteFooter() {
  return (
    <footer className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
      {/* brass hairline to match the section dividers above */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brass)/0.4)] to-transparent" />

      <div
        className="relative mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center md:px-10 md:py-28"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {/* Wordmark — the closing echo of the header. */}
        <div className="flex flex-col items-center">
          <span className="text-base md:text-lg font-semibold uppercase tracking-[0.4em] leading-none text-[hsl(var(--foreground)/0.92)]">
            Crestmont
          </span>
          <span className="mt-2.5 text-[0.5rem] md:text-[0.625rem] font-light uppercase tracking-[0.7em] text-[hsl(var(--gray-300)/0.6)]">
            Consulting&nbsp;Ltd
          </span>
        </div>

        {/* short brass rule — the same accent that tops every section, closing it */}
        <span
          className="mt-9 block h-px w-10 bg-[hsl(var(--brass)/0.35)]"
          aria-hidden
        />

        {/* Legal — middot-separated, hover draws to brass */}
        <nav
          className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.625rem] uppercase tracking-[0.3em]"
          aria-label="Legal"
        >
          {LEGAL.map((item, i) => (
            <span key={item.href} className="flex items-center gap-x-5">
              {i > 0 && (
                <span
                  className="h-2.5 w-px bg-[hsl(var(--gray-300)/0.25)]"
                  aria-hidden
                />
              )}
              <a
                href={item.href}
                className="text-[hsl(var(--gray-300)/0.75)] transition-colors duration-300 hover:text-[hsl(var(--brass))]"
              >
                {item.label}
              </a>
            </span>
          ))}
        </nav>

        {/* Copyright + colophon — the quiet maker's note that signals craft. */}
        <p className="mt-10 text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--gray-300)/0.55)]">
          © 2026 Crestmont Consulting Ltd. All rights reserved.
        </p>
        <p className="mt-3 text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--gray-300)/0.45)]">
          Paphos, Cyprus · Set in Fraunces &amp; Montserrat
        </p>
      </div>
    </footer>
  );
}
