import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Pretendard",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "Noto Sans KR",
          "Arial",
          "sans-serif"
        ]
      },
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
        civic: "0 18px 55px rgba(0, 27, 68, 0.14)",
        "civic-soft": "0 16px 46px rgba(0, 27, 68, 0.08)",
        "civic-strong": "0 24px 72px rgba(0, 27, 68, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
