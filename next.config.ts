import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/blog/aws-summit-2025-agentic-ai-production",
        destination: "/blog/aws-summit-2026-agentic-ai-production",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
