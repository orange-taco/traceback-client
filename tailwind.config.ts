import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        signal: "rgb(var(--color-signal) / <alpha-value>)",
        archive: "rgb(var(--color-archive) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Suisse Intl", "Neue Haas Grotesk Text", "Helvetica Neue", "sans-serif"],
        mono: ["IBM Plex Mono", "Berkeley Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        meta: "0.18em",
        widebrand: "0.32em",
      },
      maxWidth: {
        site: "1440px",
      },
      boxShadow: {
        frame: "0 0 0 1px rgb(var(--color-ink) / 0.08)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
