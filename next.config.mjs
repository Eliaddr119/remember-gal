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
        hostname: "*.t3.storageapi.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
