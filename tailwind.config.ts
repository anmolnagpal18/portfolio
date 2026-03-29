import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-google-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "sans-serif"],
      },

      colors: {
        primary: "#befd4a",
        secondary: "#ccff00",
        dark: "#000000",
        "gray-900": "#0F172A",
        "gray-800": "#1E293B",
        "gray-700": "#334155",
        "gray-500": "#6B7280",
        "gray-400": "#9CA3AF",
        "gray-200": "#E5E7EB",
        "gray-100": "#F1F3F7",
        "gray-50": "#F7F8FA",
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 16px 56px rgba(0,0,0,0.13)",
        soft: "0 2px 16px rgba(91,141,239,0.12)",
      },
      borderRadius: {
        "4xl": "2rem",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
