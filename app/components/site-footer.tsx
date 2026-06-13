export function SiteFooter() {
  return (
    <footer className="border-t border-ink/20 px-4 py-8 md:px-8">
      <div className="grid gap-6 font-mono text-[11px] uppercase tracking-meta text-muted md:grid-cols-[1fr_auto]">
        <p>PUBLIC RECORD / SEOUL / ONLINE STORE</p>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <a href="mailto:contact@traceback.local" className="hover:text-ink">
            Contact
          </a>
          <a href="/orders/lookup" className="hover:text-ink">
            Order Tracking
          </a>
          <span>Terms TBD</span>
        </div>
      </div>
    </footer>
  );
}
