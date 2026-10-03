import { Link } from "react-router";

import { PageHeading } from "~/components/page-heading";
import { archiveEntries } from "~/features/catalog/data/records";

export default function ArchiveIndexRoute() {
  return (
    <div>
      <PageHeading
        eyebrow="Public Records / Partial Images"
        title="Archive"
        description="Image and metadata index for observations adjacent to product records."
      />
      <section className="px-4 py-8 md:px-8">
        <div className="border-t border-border-default">
          {archiveEntries.map((entry) => (
            <Link
              key={entry.id}
              to={`/archive/${entry.entryNumber}`}
              className="grid gap-3 border-b border-border-default py-5 font-mono text-xs uppercase tracking-meta transition hover:bg-surface-subtle md:grid-cols-[160px_160px_160px_1fr_80px]"
            >
              <span>{entry.entryNumber}</span>
              <span className="text-text-secondary">{entry.date}</span>
              <span className="text-text-secondary">{entry.route}</span>
              <span>{entry.status}</span>
              <span className="text-text-secondary md:text-right">View</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
