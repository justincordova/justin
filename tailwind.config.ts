import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      serif: ['"DM Serif Display"', "serif"],
      sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      mono: ["ui-monospace", "SFMono-Regular", "monospace"],
    },
    extend: {
      colors: {
        ctp: {
          base: "var(--ctp-base, #1e1e2e)",
          mantle: "var(--ctp-mantle, #181825)",
          crust: "var(--ctp-crust, #11111b)",
          surface0: "var(--ctp-surface0, #313244)",
          surface1: "var(--ctp-surface1, #45475a)",
          surface2: "var(--ctp-surface2, #585b70)",
          overlay0: "var(--ctp-overlay0, #6c7086)",
          overlay1: "var(--ctp-overlay1, #7f849c)",
          overlay2: "var(--ctp-overlay2, #9399b2)",
          subtext0: "var(--ctp-subtext0, #a6adc8)",
          subtext1: "var(--ctp-subtext1, #bac2de)",
          text: "var(--ctp-text, #cdd6f4)",
          lavender: "var(--ctp-lavender, #b4befe)",
          blue: "var(--ctp-blue, #89b4fa)",
          sapphire: "var(--ctp-sapphire, #74c7ec)",
          sky: "var(--ctp-sky, #89dceb)",
          teal: "var(--ctp-teal, #94e2d5)",
          green: "var(--ctp-green, #a6e3a1)",
          yellow: "var(--ctp-yellow, #f9e2af)",
          peach: "var(--ctp-peach, #fab387)",
          maroon: "var(--ctp-maroon, #eba0ac)",
          red: "var(--ctp-red, #f38ba8)",
          mauve: "var(--ctp-mauve, #cba6f7)",
          pink: "var(--ctp-pink, #f5c2e7)",
          flamingo: "var(--ctp-flamingo, #f2cdcd)",
          rosewater: "var(--ctp-rosewater, #f5e0dc)",
        },
      },
      maxWidth: {
        container: "1100px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
