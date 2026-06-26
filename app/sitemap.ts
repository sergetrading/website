import type { MetadataRoute } from "next";

const BASE = "https://crestmont.consulting";

// Required for the `output: export` (GitHub Pages) build to emit this route.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "yearly", priority: 1 },
    { url: `${BASE}/legal-notice`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
