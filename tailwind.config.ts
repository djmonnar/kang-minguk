import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f4f7fb",
          100: "#e8eef7",
          700: "#183b6b",
          800: "#102d53",
          900: "#081f3d"
        },
        civic: {
          red: "#b4232a",
          blue: "#1f5ea8",
          gray: "#eef2f7"
        }
      },
      boxShadow: {
        civic: "0 18px 55px rgba(8, 31, 61, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
