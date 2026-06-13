import { NavLink } from "react-router";

import { cn } from "~/lib/classnames";

const navItems = [
  { to: "/store", label: "Store" },
  { to: "/archive", label: "Archive" },
  { to: "/about", label: "About" },
  { to: "/orders/lookup", label: "Tracking" },
  { to: "/cart", label: "Cart" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/20 bg-paper/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between px-4 md:px-8">
        <NavLink
          to="/"
          className="font-mono text-sm font-semibold uppercase tracking-widebrand"
        >
          TRACEBACK
        </NavLink>
        <nav className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-meta text-muted md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn("transition hover:text-ink", isActive && "text-ink")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/cart"
          className="focus-ring border border-ink/20 px-3 py-2 font-mono text-[11px] uppercase tracking-meta md:hidden"
        >
          Cart
        </NavLink>
      </div>
      <nav className="grid grid-cols-4 border-t border-ink/10 font-mono text-[10px] uppercase tracking-meta text-muted md:hidden">
        {navItems.slice(0, 4).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "border-r border-ink/10 px-2 py-3 text-center last:border-r-0",
                isActive && "bg-ink text-paper",
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
