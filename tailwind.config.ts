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
          50: "#f3f7fc",
          100: "#e6eef8",
          700: "#004ea2",
          800: "#003a7a",
          900: "#001b44"
        },
        civic: {
          red: "#e61e2b",
          blue: "#004ea2",
          gray: "#eef2f7"
        }
      },
      boxShadow: {
        civic: "0 18px 55px rgba(0, 27, 68, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
