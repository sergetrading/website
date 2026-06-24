import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Statischer Export für GitHub Pages
  output: "export",
  // Wird unter sergetrading.github.io/website ausgeliefert
  basePath: isProd ? "/website" : "",
  assetPrefix: isProd ? "/website/" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
