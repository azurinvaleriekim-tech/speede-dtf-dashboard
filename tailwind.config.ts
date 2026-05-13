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
        ink: "#080A0F",
        panel: "#10141D",
        "panel-soft": "#151B27",
        line: "rgba(255,255,255,0.10)",
        cyan: "#37D7FF",
        lime: "#B8FF5C",
        amber: "#FFD166",
        danger: "#FF4D6D"
      },
      boxShadow: {
        glow: "0 0 36px rgba(55, 215, 255, 0.18)",
        "danger-glow": "0 0 38px rgba(255, 77, 109, 0.24)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(10px, -8px, 0)" }
        },
        pulseRush: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        drift: "drift 80s ease-in-out infinite",
        pulseRush: "pulseRush 1.15s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
