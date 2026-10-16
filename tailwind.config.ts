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
        canvas: "var(--canvas)",
        ink: "var(--ink)",
        surface: "var(--surface)",
        graphite: "var(--graphite)",
        stone: "var(--stone)",
        silver: "var(--silver)",
        muted: "var(--muted)",
        laser: "var(--laser)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-noto-jp)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
