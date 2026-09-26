# TRACEBACK Client

React Router Framework Mode + Tailwind storefront wireframe for `TRACEBACK`.

## Commands

```sh
npm install
npm run dev
npm run typecheck
```

Local auth uses same-origin browser requests. Vite proxies `/_allauth` and
`/accounts` to Django at `http://localhost:8000`; production must route those
paths to Django through the site reverse proxy.

## Structure

- `app/components`: reusable visual and commerce components
- `app/features`: feature-owned pages, route modules, domain components, and data
- `app/routes.ts`: explicit URL-to-route-module map
- `app/routes`: resource routes or framework exceptions only
- `app/styles/tailwind.css`: design tokens and base styles
- `docs/brand-concept.md`: brand direction and visual language
- `docs/frontend-conventions.md`: routing and feature boundary conventions
- `docs/wireframe.md`: page structure and frontend implementation reference
- `public/records`: first drop reference images

## Frontend TODO

- Add CI/CD for typecheck, build, preview/deployment, and environment handling.

Backend implementation and API documentation live in `../traceback`.
