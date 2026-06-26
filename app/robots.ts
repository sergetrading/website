import type { MetadataRoute } from "next";

const BASE = "https://crestmont.consulting";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // internal scaffold route, not part of the public site
      disallow: ["/demo"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
