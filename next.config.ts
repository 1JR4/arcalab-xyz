import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: Static export disabled for portal compatibility
  // Portal requires server-side features (useSearchParams, dynamic routes)
  // output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
