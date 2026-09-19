import { ButtonLink } from "~/components/button";
import { ProductRecordCard } from "~/components/product-record-card";
import type { ArchiveEntry, Product } from "~/features/catalog/data/records";

type FeaturedProduct = { product: Product; entry: ArchiveEntry };

export function FeaturedProducts({ items }: { items: FeaturedProduct[] }) {
  return (
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
        {items.map(({ product, entry }) => (
          <ProductRecordCard key={product.slug} product={product} entry={entry} />
        ))}
      </div>
    </section>
  );
}
