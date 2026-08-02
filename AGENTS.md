# TRACEBACK Frontend Rules

This repository contains the TRACEBACK customer-facing frontend.

## Before Work

- Read `docs/brand-concept.md` before frontend work.
- Read `docs/wireframe.md` before changing routes, layout, or visible copy.
- Create task branches from the intended base and preserve existing user changes.
- When creating a PR, use `development` as the base branch unless the user explicitly instructs otherwise.
- Keep feature changes focused; API wiring and related UI changes may ship together.

## Product

- TRACEBACK is an observation-based visual archive, not a generic storefront.
- Store, Archive, Product Detail, Cart, Checkout, and Order Tracking must work for guests; keep cart, checkout, and order tracking independent of auth unless the backend requires otherwise.
- Auth is an optional customer utility, not a login-first shell; use cookies when the backend requires session state.
- Use English for brand-led labels and archive metadata; use Korean for customer guidance, commerce decisions, errors, policies, and transactions.
- Display prices in KRW unless the backend contract says otherwise, and use backend-provided final amounts.

## React Router

- Use React Router v8 framework mode as the application spine.
- Keep route modules thin in `app/routes`; place page bodies in `app/features/*/pages`.
- Prefer loaders, actions, and fetchers for route-owned data, submissions, pending state, and revalidation.
- Keep route loaders/actions near their page and delegate endpoint calls to feature API helpers; never call `fetch` directly from JSX.
- Use normal navigation for flow transitions and fetchers for work that should stay on the current route.
- Prefer React Router revalidation and navigation state before adding a cache layer or local loading flags; research and document another tool when the feature genuinely needs it.
- Do not add optimistic UI to commerce-critical flows unless rollback and server reconciliation are clear.
- Set factual route metadata for user-facing product, archive, checkout, and order pages.

## DRF API

- Treat the DRF/OpenAPI schema and serializer responses as the backend contract and source of truth.
- Put the common request wrapper in `app/lib/api-client.ts` and feature endpoints in `app/features/*/api.ts`; keep helpers independent of rendering, routing, and component state.
- Use schema paths as written; do not invent frontend endpoint aliases.
- Failed responses should become typed/request errors.
- Use serializer shapes directly unless a feature needs a view-specific shape; keep that reshaping inside the feature.
- Keep generated code separate and never hand-edit it; wrap generated clients with feature API helpers if adopted.
- Keep environment-specific API values in environment variables and do not expose secrets or sensitive customer/payment data to client state or localStorage.
- Routes and actions decide whether request errors become field messages, inline request errors, redirects, or route-level error boundaries.

## State And Structure

- Keep UI state local; put shareable filters, sorting, pagination, and search in URL params, and research/document before adding global client-owned state.
- Use `app/components` only for stable UI primitives shared across features and `app/lib` only for cross-feature utilities.
- Keep types close to their owner; promote them only when reuse is real.
- Keep mock data feature-local until its DRF endpoint exists, then remove or replace it.
- Keep frontend routes user-facing and aligned with `docs/wireframe.md`; do not mirror backend API paths.

## Components And Styling

- Use Tailwind and explicit feature markup by default.
- Extract small, domain-named components only for real reuse or meaningful behavior isolation; avoid page factories and generic master layouts.
- Use semantic HTML, labels, focus states, keyboard access, and meaningful alt text.
- Preserve the documented dry archive tone: restrained color, thin rules, monospace metadata, record-like layouts, and clear purchase actions.
- Keep exact UI styling and layout open to change; do not copy static HTML when it conflicts with the route or data structure.
- Do not add shadcn or Radix by default; introduce only the specific accessibility primitive whose behavior is costly to implement correctly, and adapt its styling.

## Forms And Commerce

- Prefer semantic HTML forms and React Router actions; use form libraries only when validation or interaction complexity justifies them.
- Use client validation for immediate checks such as required fields; DRF serializer validation remains authoritative for API rules.
- Show field errors near their inputs and request-level errors near the submit area; exact styling remains a UI decision.
- Cart persistence is undecided until the DRF cart contract is known.

## Verification

- Run typecheck after TypeScript changes and build after dependency, router, or framework changes.
- Do not add a test framework for scaffolding; add targeted tests when logic, mapping, or commerce behavior becomes non-trivial.
- For UI work, verify affected guest flows on desktop and mobile with Playwright or the in-app browser when available, including success and expected error states.
- Mobile verification must include iPhone 15 and iPhone 17 device or viewport profiles. If the tool does not provide an exact preset, use a named equivalent viewport and record the dimensions in the verification notes.

## Deferred Decisions

- SEO metadata, social previews, structured data, and sitemap strategy need a dedicated follow-up.
- Generated API client tooling is undecided until the DRF schema is stable enough to consume.
