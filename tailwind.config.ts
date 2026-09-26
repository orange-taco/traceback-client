import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-subtle": "rgb(var(--color-surface-subtle) / <alpha-value>)",
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        "border-default": "rgb(var(--color-border-default) / <alpha-value>)",
        "action-primary": "rgb(var(--color-action-primary) / <alpha-value>)",
        "action-primary-hover":
          "rgb(var(--color-action-primary-hover) / <alpha-value>)",
        "action-soft": "rgb(var(--color-action-soft) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
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
        frame: "0 0 0 1px rgb(var(--color-text-primary) / 0.08)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
