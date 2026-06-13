import type { ArchiveEntry } from "~/features/catalog/data/records";

export function RecordMeta({ entry }: { entry: ArchiveEntry }) {
  const items = [
    ["Entry", entry.entryNumber],
    ["Route", entry.route],
    ["Time", entry.time],
    ["Location", `${entry.location.lat} / ${entry.location.lng}`],
    ["Status", entry.status],
  ];

  return (
    <dl className="frame divide-y divide-ink/10">
      {items.map(([label, value]) => (
        <div key={label} className="grid grid-cols-[96px_1fr] gap-4 px-4 py-3">
          <dt className="meta">{label}</dt>
          <dd className="font-mono text-xs uppercase tracking-meta text-ink">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
