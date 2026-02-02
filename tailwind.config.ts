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
        // Vibrant orange secondary tones
        earth: {
          50: "#FFF4E6",
          100: "#FFE4CC",
          200: "#FFC999",
          300: "#FFAD66",
          400: "#FF9233",
          500: "#FF7700",
          600: "#E66A00",
          700: "#CC5500",
          800: "#B34700",
          900: "#993D00",
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
        rubik: ["var(--font-rubik)", "sans-serif"],
        secular: ["var(--font-secular)", "sans-serif"],
      },
      backgroundImage: {
        "sunflower-pattern": "url('/images/sunflower-pattern.svg')",
      },
      boxShadow: {
        "warm": "0 4px 14px 0 rgba(255, 119, 0, 0.18)",
        "warm-lg": "0 10px 40px 0 rgba(255, 119, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
