/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "150mb",
    },
  },
  images: {
    // Images are already resized to <=2000px webp @ q82 at upload time (see
    // /api/upload), so on-the-fly server optimization via sharp is redundant.
    // Disabling it removes the biggest steady-state memory + CPU consumer.
    // Browsers load the Supabase webp directly. To re-enable, remove this line.
    unoptimized: true,
    minimumCacheTTL: 2592000, // 30 days — images on this site never change
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
