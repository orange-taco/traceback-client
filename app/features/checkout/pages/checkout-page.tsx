import { ButtonLink } from "~/components/button";
import { archiveEntries, products } from "~/features/catalog/data/records";

const fields = {
  contact: ["Name", "Phone", "Email optional"],
  shipping: ["Recipient", "Phone", "Address", "Detail", "Memo"],
};

export default function CheckoutRoute() {
  const product = products[0];
  const entry = archiveEntries[0];

  return (
    <div>
      <header className="border-b border-ink/20 px-4 py-8 md:px-8">
        <p className="meta mb-4">Guest Checkout</p>
        <h1 className="font-mono text-3xl uppercase tracking-widebrand">
          Checkout
        </h1>
      </header>
      <section className="grid gap-0 md:grid-cols-[1fr_420px]">
        <form className="grid gap-8 p-4 md:p-8">
          <Fieldset title="Contact" fields={fields.contact} />
          <Fieldset title="Shipping Address" fields={fields.shipping} />
          <section>
            <p className="meta mb-3">Coupon</p>
            <div className="grid gap-2 md:grid-cols-[1fr_120px]">
              <input
                className="focus-ring border border-ink/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-meta"
                placeholder="TRACE10"
              />
              <button
                type="button"
                className="focus-ring border border-ink/30 px-4 py-3 font-mono text-[11px] uppercase tracking-meta"
              >
                Apply
              </button>
            </div>
          </section>
          <section>
            <p className="meta mb-3">Payment</p>
            <div className="grid grid-cols-2 gap-2">
              {["Card", "Easy Pay"].map((method) => (
                <button
                  key={method}
                  type="button"
                  className="focus-ring border border-ink/20 px-4 py-3 font-mono text-xs uppercase tracking-meta"
                >
                  {method}
                </button>
              ))}
            </div>
          </section>
          <section className="grid gap-3 border-y border-ink/20 py-5 font-mono text-[11px] uppercase tracking-meta">
            <label className="flex gap-3">
              <input type="checkbox" /> Purchase terms
            </label>
            <label className="flex gap-3">
              <input type="checkbox" /> Privacy collection
            </label>
          </section>
        </form>
        <aside className="border-t border-ink/20 p-4 md:border-l md:border-t-0 md:p-8">
          <div className="sticky top-28 grid gap-6">
            <div className="frame p-4">
              <p className="meta mb-4">Order Records</p>
              <p className="font-mono text-sm uppercase tracking-meta">
                {product.name}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-meta text-muted">
                {entry.entryNumber} / BLACK / M / 1
              </p>
            </div>
            <div className="divide-y divide-ink/20 border-y border-ink/20 font-mono text-xs uppercase tracking-meta">
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
            <ButtonLink to="/orders/TB-20260510-0001">Pay</ButtonLink>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Fieldset({ title, fields }: { title: string; fields: string[] }) {
  return (
    <section>
      <p className="meta mb-3">{title}</p>
      <div className="grid gap-3">
        {fields.map((field) => (
          <input
            key={field}
            className="focus-ring border border-ink/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-meta"
            placeholder={field}
          />
        ))}
      </div>
    </section>
  );
}
