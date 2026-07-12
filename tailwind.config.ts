import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0B0E14",
          50: "#F4F5F7",
          panel: "#12151C",
          line: "#1E222C",
          muted: "#8A8FA3",
        },
        openai: { DEFAULT: "#2FBF8F", dim: "#1A6F53" },
        gemini: { DEFAULT: "#5B8DF6", dim: "#31508F" },
        llama: { DEFAULT: "#F0B429", dim: "#8F6A18" },
        synth: { DEFAULT: "#C9A8FF", dim: "#7C5CC7" },
        paper: "#F6F4EF",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(201,168,255,0.08), transparent 60%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "flow-line": {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "flow-line": "flow-line 2.4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
      borderRadius: {
        xl: "0.85rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;