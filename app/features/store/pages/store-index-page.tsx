import { PageHeading } from "~/components/page-heading";
import { ProductRecordCard } from "~/components/product-record-card";
import { getProductEntry, products } from "~/features/catalog/data/records";

export default function StoreIndexRoute() {
  const productRecords = products
    .flatMap((product) => {
      const entry = getProductEntry(product);
      return entry ? [{ product, entry }] : [];
    });

  return (
    <div>
      <PageHeading
        eyebrow="Filter: All / T-Shirt / Available"
        title="Store"
        description="Product list behaves like a record index. Price and availability stay visible; decoration stays restrained."
      />
      <section className="px-4 py-8 md:px-8">
        <div className="mb-4 flex items-center justify-between border-b border-ink/20 pb-4">
          <p className="meta">Sort: Newest</p>
          <p className="meta">{productRecords.length} Records</p>
        </div>
        {productRecords.map(({ product, entry }) => (
          <ProductRecordCard
            key={product.slug}
            product={product}
            entry={entry}
          />
        ))}
      </section>
    </div>
  );
}
