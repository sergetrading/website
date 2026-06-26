import React from "react";

/**
 * Page-wide atmosphere: a static film-grain layer plus a soft vignette, mounted
 * once at the document level. Together they give the flat black real depth and
 * a paper-like tooth — the quiet, almost-subliminal detail behind most premium
 * sites. Static (no animation) to keep it off the render path for Core Web
 * Vitals. Purely decorative and never interactive, so it's hidden from a11y and
 * lets every click pass through.
 */

// Fractal-noise grain encoded inline so there's no extra network request.
const GRAIN =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      {/* vignette — pulls focus to the centre, sinks the corners into the black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 120% at 50% 32%, transparent 48%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: "160px 160px" }}
      />
    </div>
  );
}
