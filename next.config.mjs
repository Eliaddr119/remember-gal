/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "150mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.fly.storage.tigris.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
