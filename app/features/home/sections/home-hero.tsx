import { ButtonLink } from "~/components/button";
import { ImageFrame } from "~/components/image-frame";
import type { ArchiveEntry } from "~/features/catalog/data/records";

export function HomeHero({ entry }: { entry: ArchiveEntry }) {
  return (
    <section className="border-b border-border-default">
      <div className="p-4 md:p-8">
        <ImageFrame
          src={entry.image}
          alt={entry.title}
          className="h-[62vh] min-h-[360px]"
        />
        <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="meta mb-2">{entry.entryNumber}</p>
            <h1 className="max-w-2xl font-mono text-2xl uppercase tracking-widebrand md:text-4xl">
              {entry.title}
            </h1>
          </div>
          <ButtonLink to="/store">Shop the drop</ButtonLink>
        </div>
      </div>
    </section>
  );
}
