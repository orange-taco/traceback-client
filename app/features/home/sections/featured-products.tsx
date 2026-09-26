import { ProductRecordCard } from "~/components/product-record-card";
import type { ArchiveEntry, Product } from "~/features/catalog/data/records";

type FeaturedProduct = { product: Product; entry: ArchiveEntry };

export function FeaturedProducts({ items }: { items: FeaturedProduct[] }) {
  return (
    <section className="px-4 py-10 md:px-8 md:py-14">
      <h2 className="mb-6 font-mono text-2xl uppercase tracking-widebrand">
        Featured products
      </h2>
      <div>
        {items.map(({ product, entry }) => (
          <ProductRecordCard key={product.slug} product={product} entry={entry} />
        ))}
      </div>
    </section>
  );
}
