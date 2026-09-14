# Frontend Conventions

This project follows React Router framework mode conventions and keeps route
ownership inside feature modules.

## Routing

- Define URL mappings only in `app/routes.ts`.
- Map page routes directly to `features/<domain>/pages/*.tsx`.
- Keep `app/routes/` for resource routes or framework exceptions only.
- Do not add thin wrapper route modules that only re-export feature modules.

```ts
route("/store/:slug", "features/store/pages/product-detail-page.tsx");
```

The mapped page file is the route module. It should export React Router route
module APIs directly:

```tsx
import type { Route } from "./+types/product-detail-page";

export async function loader({ params }: Route.LoaderArgs) {
  // load route data
}

export async function action({ request }: Route.ActionArgs) {
  // mutate route data
}

export default function ProductDetailPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  // render route UI
}
```

## Route Data

- Prefer `Route.ComponentProps` over `useLoaderData<typeof loader>()` and
  `useActionData()` for route-owned data.
- Use hooks such as `useFetcher`, `useNavigation`, and `useSearchParams` for
  interaction state and URL state.
- Type `meta`, `loader`, and `action` with generated `Route.*` types.
- Run `npm run typecheck` before merging route changes so `react-router typegen`
  stays current.

## Feature Boundaries

- Put route UI in `features/<domain>/pages`.
- Put domain components in `features/<domain>/components`.
- Put reusable app-wide UI in `app/components`.
- Put server-only route helpers in `.server.ts` modules.
- Put client/server shared types in `*.types.ts`, not in `.server.ts` modules.
- A route module may import server-only helpers for `loader` and `action`
  exports, relying on React Router's server-code removal during client builds.

## Design Tokens

- Define the primitive palette and semantic colors as CSS variables in
  `app/styles/tailwind.css`, then expose only semantic colors through
  `tailwind.config.ts`.
- Primitive tokens such as `--blue-600` and `--slate-300` are implementation
  values. Components must not reference them directly.
- Use semantic tokens according to their role:
  - `background`: page canvas
  - `surface`: cards, controls, and raised content surfaces
  - `surface-subtle`: neutral hover states and low-emphasis bands
  - `text-primary`: primary copy and labels
  - `text-secondary`: metadata and supporting copy
  - `border-default`: dividers and control borders
  - `action-primary`: the single highest-priority action in a task region
  - `action-primary-hover`: hover state for that primary action
  - `action-soft`: selected navigation, tabs, filters, and options
  - `danger`: destructive actions and error feedback
- Solid `action-primary` backgrounds are reserved for actions that move the
  user to the next meaningful step, such as Add To Cart, Checkout, Pay, or
  submitting authentication. Use at most one solid primary action per task
  region.
- Active navigation uses action-colored text or an underline. Selected tabs,
  filters, and options use `action-soft` with action-colored text and borders;
  they do not use a solid primary background.
- Secondary navigation and alternate actions use a white `surface`, a default
  border, and primary text. Ordinary hover feedback uses `surface-subtle`.
- Provider brand assets use their official files and colors, not palette
  tokens.
- Do not add legacy palette aliases such as `paper`, `ink`, `muted`, `line`,
  `signal`, `archive`, `panel`, `subtle`, or `accent`.
- Provider brand assets should keep their official colors and proportions.
- The base palette should stay pure white. Use cool blue-grey borders and a
  restrained cobalt accent for active navigation, primary actions, selection,
  and focus states. Avoid beige, cream, yellowed paper, washed-out grey, heavy
  concrete tones, and blue-tinted page backgrounds.

## Current Target

The installed packages target React Router v8 framework mode:

- explicit `routes.ts` route configuration
- feature-owned route modules
- generated `Route` types
- no file-route wrapper layer
- auth policy and input limits are documented in `docs/auth-policy.md`

## Authentication

- Django and django-allauth own the authenticated session.
- Browser auth uses the HttpOnly Django session cookie and CSRF token.
- Call `/_allauth` and `/accounts` through the storefront origin. Do not store
  access or refresh tokens in browser storage.
- Vite proxies these paths locally. Production reverse proxy routing must keep
  the same public paths and preserve the original host and scheme.
- React Router must not create a second session for the same login.
