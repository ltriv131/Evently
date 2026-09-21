import type { NextConfig } from "next";

const privateNetworkOrigins = [
  "10.*.*.*",
  "192.168.*.*",
  "relieving-freeing-gray.ngrok-free.dev",
  ...Array.from({ length: 16 }, (_, i) => `172.${16 + i}.*.*`),
];

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: privateNetworkOrigins,
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
