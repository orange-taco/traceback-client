import type { ReactNode } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";

import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import stylesheet from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => [
  { title: "TRACEBACK" },
  {
    name: "description",
    content: "Observation-based visual archive and storefront.",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="mx-auto flex min-h-screen max-w-site flex-col border-x border-ink/10 bg-paper/90">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
