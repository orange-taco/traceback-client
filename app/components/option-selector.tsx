import { cn } from "~/lib/classnames";

export function OptionSelector({
  label,
  options,
  selected,
}: {
  label: string;
  options: string[];
  selected?: string;
}) {
  return (
    <div>
      <p className="meta mb-3">{label}</p>
      <div className="grid grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={cn(
              "focus-ring border px-3 py-3 font-mono text-xs uppercase tracking-meta transition",
              selected === option
                ? "border-ink bg-ink text-paper"
                : "border-ink/20 hover:border-ink",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
