import React from "react";
import { SiteFooter } from "@/components/ui/site-footer";

/**
 * Shared shell for the legal pages (Impressum, Datenschutz). Mirrors the site's
 * monochrome look: a wordmark that links home, a centred max-width content
 * column, and the shared footer.
 */
export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        {/* Top wordmark — links back to the homepage */}
        <div className="border-b border-[hsl(var(--gray-300)/0.12)]">
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-8 text-center">
            <a
              href="/"
              className="inline-block"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <span className="block text-xl md:text-2xl font-bold uppercase tracking-[0.4em] leading-none text-[hsl(var(--foreground))]">
                Crestmont
              </span>
              <span className="mt-2 block text-[0.625rem] font-light uppercase tracking-[0.7em] text-[hsl(var(--gray-300)/0.7)]">
                Consulting&nbsp;&nbsp;Ltd
              </span>
            </a>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            {title}
          </h1>

          <div className="mt-12 space-y-10 text-base md:text-lg leading-relaxed text-[hsl(var(--gray-300)/0.9)]">
            {children}
          </div>

          <div className="mt-16 pt-8 border-t border-[hsl(var(--gray-300)/0.12)]">
            <a
              href="/"
              className="text-xs uppercase tracking-[0.25em] text-[hsl(var(--gray-300)/0.7)] transition-colors duration-300 hover:text-[hsl(var(--foreground))]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              ← Back to home
            </a>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}

/** Small section heading used inside the legal pages. */
export function LegalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl md:text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]"
      style={{ fontFamily: "var(--font-fraunces), serif" }}
    >
      {children}
    </h2>
  );
}

/**
 * Placeholder marker — makes it obvious which details still need to be filled
 * in with the company's real legal information.
 */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-[hsl(var(--gray-300)/0.15)] text-[hsl(var(--foreground))] px-1.5 py-0.5 rounded-sm">
      {children}
    </mark>
  );
}
