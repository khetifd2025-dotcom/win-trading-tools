import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fff9e6",
          100: "#ffedb0",
          200: "#f8d76b",
          300: "#e7b938",
          400: "#d29a19",
          500: "#b97d0f",
          600: "#965f0d",
          700: "#72470f",
          800: "#533511",
          900: "#38240d"
        }
      },
      boxShadow: {
        glow: "0 18px 60px rgba(185, 125, 15, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
