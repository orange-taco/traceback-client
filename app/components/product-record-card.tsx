import { Link } from "react-router";

import type { ArchiveEntry, Product } from "~/features/catalog/data/records";
import { ImageFrame } from "~/components/image-frame";

export function ProductRecordCard({
  product,
  entry,
}: {
  product: Product;
  entry: ArchiveEntry;
}) {
  return (
    <Link
      to={`/store/${product.slug}`}
      className="group grid gap-4 border-t border-ink/20 py-5 transition hover:bg-ink/[0.03] md:grid-cols-[96px_160px_1fr_160px]"
    >
      <div className="font-mono text-xs uppercase tracking-meta text-muted">
        {entry.entryNumber}
      </div>
      <ImageFrame
        src={entry.image}
        alt={entry.title}
        className="aspect-[4/3]"
        imageClassName="transition duration-500 group-hover:scale-[1.03]"
      />
      <div>
        <p className="font-mono text-sm uppercase tracking-meta">
          {product.name}
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-meta text-muted">
          {product.color} / {product.season} / {product.gender}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          {entry.title}
        </p>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-meta md:text-right">
        <p>{product.status}</p>
        <p className="mt-2 text-muted">{product.priceLabel}</p>
      </div>
    </Link>
  );
}
