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
        // Brand palette - NexaGen Bio
        brand: {
          // ── DARK TONE (Obsidian) ──────────────────────────────
          black: "#0A0E0C",
          "black-soft": "#0F1410",
          "black-mid": "#141A16",
          "black-card": "#111711",
          "black-border": "#1C2420",
          white: "#F4F6F2",
          "white-dim": "#C8CEC6",
          "white-muted": "#8A9488",
          accent: "#6EFFC8",
          "accent-dim": "#4DC99B",
          "accent-glow": "rgba(110,255,200,0.15)",
          "accent-glow-strong": "rgba(110,255,200,0.3)",
          // ── LIGHT TONE (Ethereal Bio-Sage & Celadon Mist) ───────
          mist: "#EBF5F0",
          "mist-soft": "#F3FAF6",
          "mist-card": "#FFFFFF",
          "mist-border": "#CCE5D8",
          "mist-border-subtle": "#DEEFE6",
          "mist-muted": "#446554",
          "mist-text": "#081C13",
          "mist-text-dim": "#223E30",
          // ── SHARED ACCENT ──────────────────────────────────────
          "accent-dark": "#0A6844",   // deep bio-emerald for light sage bg
          "accent-light": "#6EFFC8",  // bioluminescent for dark obsidian bg
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.25rem, 6.5vw, 7.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(1.75rem, 4.5vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.35rem, 2.75vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "body-lg": ["clamp(0.925rem, 1.25vw, 1.125rem)", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },
      spacing: {
        "section": "clamp(5rem, 10vw, 10rem)",
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        "sm": "3px",
        "md": "5px",
        "lg": "8px",
        "xl": "12px",
      },
      backgroundImage: {
        "grid-lines": "linear-gradient(rgba(110,255,200,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(110,255,200,0.03) 1px, transparent 1px)",
        "scanline": "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(110,255,200,0.015) 2px, rgba(110,255,200,0.015) 4px)",
        "noise": "url('/noise.svg')",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(110,255,200,0.2)",
        "glow-md": "0 0 40px rgba(110,255,200,0.25)",
        "glow-lg": "0 0 80px rgba(110,255,200,0.2)",
        "card": "0 1px 0 rgba(110,255,200,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
