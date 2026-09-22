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
        paper: "#F7F4EE",
        paper2: "#EFEAE0",
        ink: "#1B1815",
        inksoft: "#4A433C",
        line: "#DBD2C1",
        stone: "#B7AB96",
        gold: "#8F6F45",
        goldsoft: "#C7AC80",
        success: "#4B6B4E",
        warn: "#B07A2E",
        danger: "#9C3B2C"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      letterSpacing: {
        wide2: "0.08em",
        wide3: "0.14em"
      },
      maxWidth: {
        content: "1400px"
      }
    }
  },
  plugins: []
};

export default config;
