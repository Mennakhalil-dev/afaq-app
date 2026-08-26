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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#b58f40", // Warm Gold
          hover: "#9a7833",
        },
        dark: {
          100: "#1a1a1a",
          200: "#121212",
          300: "#0a0a0a",
        }
      },
    },
  },
  plugins: [],
};
export default config;
