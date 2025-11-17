import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '4.imimg.com',
      },
      {
        protocol: 'https',
        hostname: '5.imimg.com',
      },
    ],
  },
};

export default nextConfig;
