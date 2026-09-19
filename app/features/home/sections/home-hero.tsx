import { ButtonLink } from "~/components/button";
import { ImageFrame } from "~/components/image-frame";
import { RecordMeta } from "~/components/record-meta";
import type { ArchiveEntry } from "~/features/catalog/data/records";

export function HomeHero({ entry }: { entry: ArchiveEntry }) {
  return (
    <section className="grid min-h-[calc(100vh-8rem)] border-b border-border-default md:grid-cols-[1fr_420px]">
      <div className="p-4 md:p-8">
        <p className="meta mb-4">
          {entry.entryNumber} / PUBLIC RECORD / {entry.route} / {entry.time}
        </p>
        <ImageFrame
          src={entry.image}
          alt={entry.title}
          caption={entry.fileName}
          className="h-[62vh] min-h-[420px]"
        />
      </div>
      <aside className="border-t border-border-default p-4 md:border-l md:border-t-0 md:p-8">
        <div className="sticky top-28 grid gap-6">
          <div>
            <p className="meta mb-4">Observation Log</p>
            <h1 className="font-mono text-4xl uppercase tracking-widebrand md:text-6xl">
              TRACE
              <br />
              BACK
            </h1>
          </div>
          <RecordMeta entry={entry} />
          <div className="flex flex-col gap-3">
            <ButtonLink to="/store">View Drop 001</ButtonLink>
            <ButtonLink to="/archive/ENTRY_001" tone="secondary">
              View Archive Entry
            </ButtonLink>
          </div>
        </div>
      </aside>
    </section>
  );
}
