import { ButtonLink } from "~/components/button";

export default function OrderLookupRoute() {
  return (
    <div>
      <header className="border-b border-ink/20 px-4 py-8 md:px-8">
        <p className="meta mb-4">Guest Order</p>
        <h1 className="font-mono text-3xl uppercase tracking-widebrand">
          Order Tracking
        </h1>
      </header>
      <section className="mx-auto max-w-2xl px-4 py-10 md:px-8">
        <form className="frame grid gap-4 p-4 md:p-6">
          <label>
            <span className="meta mb-2 block">Order Number</span>
            <input
              className="focus-ring w-full border border-ink/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-meta"
              placeholder="TB-20260510-0001"
            />
          </label>
          <label>
            <span className="meta mb-2 block">Phone</span>
            <input
              className="focus-ring w-full border border-ink/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-meta"
              placeholder="01000000000"
            />
          </label>
          <ButtonLink to="/orders/TB-20260510-0001">Look Up</ButtonLink>
        </form>
      </section>
    </div>
  );
}
