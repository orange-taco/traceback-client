import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";

import { Button, ButtonLink } from "~/components/button";
import { ImageFrame } from "~/components/image-frame";
import { OptionSelector } from "~/components/option-selector";
import { RecordMeta } from "~/components/record-meta";
import { getEntryById, getProductBySlug } from "~/features/catalog/data/records";

export async function loader({ params }: LoaderFunctionArgs) {
  const product = getProductBySlug(params.slug ?? "");
  const entry = product ? getEntryById(product.entryId) : undefined;

  if (!product || !entry) {
    throw new Response("Not Found", { status: 404 });
  }

  return { product, entry };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data ? `${data.product.name} / TRACEBACK` : "TRACEBACK" },
];

export default function ProductDetailRoute() {
  const { product, entry } = useLoaderData<typeof loader>();

  return (
    <div>
      <header className="border-b border-ink/20 px-4 py-5 md:px-8">
        <p className="meta">
          {entry.entryNumber} / {product.name}
        </p>
      </header>
      <section className="grid gap-0 md:grid-cols-[1fr_420px]">
        <div className="p-4 md:p-8">
          <ImageFrame
            src={entry.image}
            alt={entry.title}
            caption={entry.fileName}
            className="aspect-[4/5] md:aspect-[5/4]"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[entry.image, "/records/entry-002.jpeg", "/records/entry-003.png"].map(
              (src) => (
                <ImageFrame
                  key={src}
                  src={src}
                  alt=""
                  className="aspect-square"
                  imageClassName="grayscale"
                />
              ),
            )}
          </div>
        </div>
        <aside className="border-t border-ink/20 p-4 md:border-l md:border-t-0 md:p-8">
          <div className="sticky top-28 grid gap-6">
            <RecordMeta entry={entry} />
            <div className="border-t border-ink/20 pt-6">
              <p className="meta mb-3">{product.category}</p>
              <h1 className="font-mono text-2xl uppercase tracking-widebrand">
                {product.name}
              </h1>
              <p className="mt-4 font-mono text-sm uppercase tracking-meta">
                {product.priceLabel}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-meta text-muted">
                {product.color} / {product.season} / {product.gender}
              </p>
            </div>
            <OptionSelector label="Size" options={product.sizes} selected="M" />
            <div>
              <p className="meta mb-3">Quantity</p>
              <div className="grid grid-cols-3 border border-ink/20 font-mono text-xs uppercase tracking-meta">
                <button type="button" className="focus-ring py-3">
                  -
                </button>
                <span className="border-x border-ink/20 py-3 text-center">1</span>
                <button type="button" className="focus-ring py-3">
                  +
                </button>
              </div>
            </div>
            <div className="grid gap-3">
              <Button>Add To Cart</Button>
              <ButtonLink to="/checkout" tone="secondary">
                Buy Now
              </ButtonLink>
            </div>
          </div>
        </aside>
      </section>
      <section className="grid border-t border-ink/20 md:grid-cols-4">
        {[
          ["Record Note", entry.title],
          ["Print Data", product.printData],
          ["Size", "S / M / L / XL. Final measurements TBD."],
          ["Shipping", "Domestic shipping policy TBD."],
        ].map(([title, body]) => (
          <article
            key={title}
            className="border-b border-ink/20 p-4 md:border-b-0 md:border-r md:p-8 md:last:border-r-0"
          >
            <p className="meta mb-4">{title}</p>
            <p className="text-sm leading-6 text-muted">{body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
