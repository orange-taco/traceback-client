import { Link } from "react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "~/lib/classnames";

type ButtonTone = "primary" | "secondary";

const toneClass: Record<ButtonTone, string> = {
  primary: "border-ink bg-ink text-paper hover:bg-signal hover:border-signal",
  secondary: "border-ink/30 bg-transparent text-ink hover:border-ink",
};

export function Button({
  tone = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: ButtonTone }) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center border px-5 py-3 font-mono text-[11px] uppercase tracking-meta transition",
        toneClass[tone],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  to,
  tone = "primary",
  className,
  children,
}: {
  to: string;
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center border px-5 py-3 font-mono text-[11px] uppercase tracking-meta transition",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </Link>
  );
}
