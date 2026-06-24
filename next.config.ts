import type { NextConfig } from "next";

// Nur die GitHub-Actions-Pipeline setzt GITHUB_PAGES=true.
// Lokal und auf dem Hostinger-VPS (Docker) ist diese Variable nicht gesetzt.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // GitHub Pages: statischer Export unter /website
  // Hostinger VPS: vollwertiger Next.js-Server im Docker-Container
  output: isGithubPages ? "export" : "standalone",
  basePath: isGithubPages ? "/website" : "",
  assetPrefix: isGithubPages ? "/website/" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
