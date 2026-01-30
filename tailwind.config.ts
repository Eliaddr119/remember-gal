import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Classic sunflower palette - warm and elegant
        sunflower: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        // Rich earth tones
        earth: {
          50: "#FDFCFB",
          100: "#F5F0EB",
          200: "#E8DDD4",
          300: "#D4C4B5",
          400: "#B8A089",
          500: "#8B7355",
          600: "#6B5344",
          700: "#4A3728",
          800: "#3D2B1F",
          900: "#2C1810",
        },
        // Warm ivory/cream
        ivory: {
          50: "#FFFEF7",
          100: "#FDFBF3",
          200: "#FAF6E9",
          300: "#F5EED8",
          400: "#EDE4C5",
          500: "#E3D7AD",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heebo: ["var(--font-heebo)", "sans-serif"],
      },
      backgroundImage: {
        "sunflower-pattern": "url('/images/sunflower-pattern.svg')",
      },
      boxShadow: {
        "warm": "0 4px 14px 0 rgba(139, 115, 85, 0.15)",
        "warm-lg": "0 10px 40px 0 rgba(139, 115, 85, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
