import { ButtonLink } from "~/components/button";
import { ImageFrame } from "~/components/image-frame";
import { ProductRecordCard } from "~/components/product-record-card";
import { RecordMeta } from "~/components/record-meta";
import {
  archiveEntries,
  getProductEntry,
  products,
} from "~/features/catalog/data/records";

export default function IndexRoute() {
  const heroEntry = archiveEntries[0];
  const featuredProducts = products.flatMap((product) => {
    const entry = getProductEntry(product);
    return entry ? [{ product, entry }] : [];
  });

  return (
    <div>
      <section className="grid min-h-[calc(100vh-8rem)] border-b border-ink/20 md:grid-cols-[1fr_420px]">
        <div className="p-4 md:p-8">
          <p className="meta mb-4">
            {heroEntry.entryNumber} / PUBLIC RECORD / {heroEntry.route} /{" "}
            {heroEntry.time}
          </p>
          <ImageFrame
            src={heroEntry.image}
            alt={heroEntry.title}
            caption={heroEntry.fileName}
            className="h-[62vh] min-h-[420px]"
          />
        </div>
        <aside className="border-t border-ink/20 p-4 md:border-l md:border-t-0 md:p-8">
          <div className="sticky top-28 grid gap-6">
            <div>
              <p className="meta mb-4">Observation Log</p>
              <h1 className="font-mono text-4xl uppercase tracking-widebrand md:text-6xl">
                TRACE
                <br />
                BACK
              </h1>
            </div>
            <RecordMeta entry={heroEntry} />
            <div className="flex flex-col gap-3">
              <ButtonLink to="/store">View Drop 001</ButtonLink>
              <ButtonLink to="/archive/ENTRY_001" tone="secondary">
                View Archive Entry
              </ButtonLink>
            </div>
          </div>
        </aside>
      </section>

      <section className="px-4 py-10 md:px-8 md:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="meta mb-3">Drop_001</p>
            <h2 className="font-mono text-2xl uppercase tracking-widebrand">
              Product Records
            </h2>
          </div>
          <ButtonLink to="/store" tone="secondary">
            Enter Store
          </ButtonLink>
        </div>
        <div>
          {featuredProducts.map(({ product, entry }) => (
            <ProductRecordCard
              key={product.slug}
              product={product}
              entry={entry}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
