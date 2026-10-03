import { NavLink } from "react-router";

import { cn } from "~/lib/classnames";

const navItems = [
  { to: "/store", label: "Store" },
  { to: "/archive", label: "Archive" },
  { to: "/about", label: "About" },
  { to: "/orders/lookup", label: "Tracking" },
  { to: "/account", label: "Account" },
  { to: "/cart", label: "Cart" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-default bg-surface">
      <div className="flex min-h-16 items-center justify-between px-4 md:px-8">
        <NavLink
          to="/"
          className="font-mono text-sm font-semibold uppercase tracking-widebrand transition hover:text-action-primary"
        >
          TRACEBACK
        </NavLink>
        <nav className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-meta text-text-secondary md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "border-b border-transparent py-1 transition hover:text-action-primary",
                  isActive && "border-action-primary text-action-primary",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/cart"
          className="focus-ring border border-border-default bg-surface px-3 py-2 font-mono text-[11px] uppercase tracking-meta text-text-primary transition hover:border-action-primary hover:text-action-primary md:hidden"
        >
          Cart
        </NavLink>
      </div>
      <nav className="grid grid-cols-5 border-t border-border-default font-mono text-[10px] uppercase tracking-meta text-text-secondary md:hidden">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "border-r border-border-default px-2 py-3 text-center transition last:border-r-0 hover:bg-surface-subtle hover:text-action-primary",
                isActive && "bg-action-soft text-action-primary",
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
