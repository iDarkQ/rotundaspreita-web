import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.PLAYWRIGHT_NEXT_DIST_DIR ?? ".next",
  output: "standalone",
};

export default nextConfig;
