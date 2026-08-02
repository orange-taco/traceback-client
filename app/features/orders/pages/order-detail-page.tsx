import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";

import { ButtonLink } from "~/components/button";
import { PageHeading } from "~/components/page-heading";
import { products } from "~/features/catalog/data/records";

export async function loader({ params }: LoaderFunctionArgs) {
  return {
    orderNumber: params.orderNumber ?? "TB-20260510-0001",
    product: products[0],
  };
}

export const meta: MetaFunction<typeof loader> = ({ loaderData }) => [
  { title: loaderData ? `${loaderData.orderNumber} / TRACEBACK` : "TRACEBACK" },
];

export default function OrderDetailRoute() {
  const { orderNumber, product } = useLoaderData<typeof loader>();

  return (
    <div>
      <PageHeading
        eyebrow="Order Recorded"
        title={orderNumber}
        description="Static confirmation wireframe. Payment and fulfillment state will be backed by the server order model."
      />
      <section className="mx-auto max-w-3xl px-4 py-10 md:px-8">
        <div className="divide-y divide-ink/20 border-y border-ink/20 font-mono text-xs uppercase tracking-meta">
          {[
            ["Status", "PAYMENT_CONFIRMED"],
            ["Total", product.priceLabel],
            ["Shipping To", "Seoul, KR"],
            ["Tracking Number", "-"],
            ["Items", `${product.name} / BLACK / M / 1`],
          ].map(([label, value]) => (
            <div key={label} className="grid gap-2 py-4 md:grid-cols-[180px_1fr]">
              <span className="text-muted">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <ButtonLink to="/orders/lookup" tone="secondary">
            Order Tracking
          </ButtonLink>
          <ButtonLink to="/store">Return To Store</ButtonLink>
        </div>
      </section>
    </div>
  );
}
