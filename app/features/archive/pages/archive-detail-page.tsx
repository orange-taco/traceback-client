import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";

import { ImageFrame } from "~/components/image-frame";
import { PageHeading } from "~/components/page-heading";
import { RecordMeta } from "~/components/record-meta";
import { getEntryByNumber, products } from "~/features/catalog/data/records";

export async function loader({ params }: LoaderFunctionArgs) {
  const entry = getEntryByNumber(params.entry ?? "");
  const relatedProduct = products.find((product) => product.entryId === entry?.id);

  if (!entry) {
    throw new Response("Not Found", { status: 404 });
  }

  return { entry, relatedProduct };
}

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => [
  { title: loaderData ? `${loaderData.entry.entryNumber} / TRACEBACK` : "TRACEBACK" },
];

export default function ArchiveDetailRoute() {
  const { entry, relatedProduct } = useLoaderData<typeof loader>();

  return (
    <div>
      <PageHeading
        eyebrow="Archive Detail"
        title={entry.entryNumber}
        description={entry.title}
      />
      <section className="grid gap-0 md:grid-cols-[1fr_420px]">
        <div className="p-4 md:p-8">
          <ImageFrame
            src={entry.image}
            alt={entry.title}
            caption={entry.fileName}
            className="aspect-[4/5] md:aspect-[5/4]"
          />
        </div>
        <aside className="border-t border-ink/20 p-4 md:border-l md:border-t-0 md:p-8">
          <div className="sticky top-28 grid gap-6">
            <RecordMeta entry={entry} />
            <div className="frame p-4">
              <p className="meta mb-4">Tags</p>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-ink/20 px-3 py-2 font-mono text-[10px] uppercase tracking-meta text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {relatedProduct ? (
              <Link
                to={`/store/${relatedProduct.slug}`}
                className="focus-ring border border-ink bg-ink px-5 py-3 text-center font-mono text-[11px] uppercase tracking-meta text-paper transition hover:border-signal hover:bg-signal"
              >
                Related Product: {relatedProduct.name}
              </Link>
            ) : null}
          </div>
        </aside>
      </section>
    </div>
  );
}
