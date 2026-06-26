const LEGAL = [
  { label: "Legal Notice", href: "/legal-notice" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

/**
 * Slim site footer — same restrained, monochrome language as the rest of the
 * page (black, Montserrat, hairline separators). Shows the copyright line and
 * legal links.
 */
export function SiteFooter() {
  return (
    <footer className="relative w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden">
      {/* brass hairline to match the section dividers above */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--brass)/0.4)] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
        {/* copyright & legal */}
        <div
          className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between"
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
                className="text-[0.625rem] uppercase tracking-[0.3em] text-[hsl(var(--gray-300)/0.6)] transition-colors duration-300 hover:text-[hsl(var(--brass))]"
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
