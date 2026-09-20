import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/events/:path*",
        destination: `${
          process.env.EXPRESS_API_URL ?? "http://localhost:4000"
        }/api/events/:path*`,
      },
    ];
  },
};

export default nextConfig;
