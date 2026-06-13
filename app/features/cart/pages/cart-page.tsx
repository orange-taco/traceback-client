import { ButtonLink } from "~/components/button";
import { ImageFrame } from "~/components/image-frame";
import { archiveEntries, products } from "~/features/catalog/data/records";

export default function CartRoute() {
  const product = products[0];
  const entry = archiveEntries[0];

  return (
    <div>
      <header className="border-b border-ink/20 px-4 py-8 md:px-8">
        <p className="meta mb-4">Checkout Path</p>
        <h1 className="font-mono text-3xl uppercase tracking-widebrand">Cart</h1>
      </header>
      <section className="px-4 py-8 md:px-8">
        <div className="grid gap-4 border-y border-ink/20 py-5 md:grid-cols-[120px_1fr_160px_120px_160px] md:items-center">
          <ImageFrame src={entry.image} alt={entry.title} className="aspect-square" />
          <div>
            <p className="font-mono text-sm uppercase tracking-meta">
              {product.name}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-meta text-muted">
              {product.color} / M
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-meta text-muted">
            Option: Black / M
          </p>
          <p className="font-mono text-xs uppercase tracking-meta">- 1 +</p>
          <p className="font-mono text-xs uppercase tracking-meta md:text-right">
            {product.priceLabel}
          </p>
        </div>
        <div className="ml-auto mt-8 max-w-md divide-y divide-ink/20 border-y border-ink/20 font-mono text-xs uppercase tracking-meta">
          {[
            ["Subtotal", product.priceLabel],
            ["Shipping", "KRW 0,000"],
            ["Total", product.priceLabel],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-4">
              <span className="text-muted">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div className="ml-auto mt-6 max-w-md">
          <ButtonLink to="/checkout" className="w-full">
            Checkout
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
