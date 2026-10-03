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
                ? "border-action-primary bg-action-soft text-action-primary"
                : "border-border-default bg-surface text-text-secondary hover:border-action-primary hover:bg-surface-subtle hover:text-action-primary",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
