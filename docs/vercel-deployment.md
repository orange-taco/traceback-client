# Vercel development deployment

The development frontend is deployed on Vercel. Production will be a separate
Vercel project later; it is not deployed or configured now.

This client uses React Router v8 Framework Mode with SSR. The Django backend
owns browser sessions. Keep development and production isolated:

| Environment | Frontend | Backend |
| --- | --- | --- |
| Development | Development Vercel project | Development AWS Django instance |
| Production | Production Vercel project | Production AWS Django instance |

Use separate Vercel projects so a development build cannot accidentally
receive production backend settings.
`FRONTEND_ORIGIN` is the public browser origin. `DJANGO_ORIGIN` is the HTTPS
origin that Vercel must reach for Django. `.env.example` shows the value
format. Enter `DJANGO_ORIGIN` in the matching Vercel project's environment
settings when the backend origin is ready. Local `.env` files are not uploaded
to Vercel.

## Current development deployment

On 2026-09-26, Vercel deployed commit `850b2552860242db2664338e19898d950991efa9`
from the `development` branch. The project auto-detected React Router 8.3.0;
SSR pages `/` and `/auth/login` returned HTTP 200. No Vercel preset or adapter
was needed for this deployment.

The stable development URL is https://traceback-client-nine.vercel.app. The
Vercel project's Production Branch is set to `development`; this is the
development project and must not be treated as production. The optional
`@vercel/react-router` preset is a separate concern: version 1.3.6 declares
React Router v7 peer dependencies, but this did not block zero-configuration
hosting and SSR.

## Authentication routing that deployment must provide

The browser calls `/_allauth/*` and `/accounts/*` on its frontend origin.
`vercel.ts` forwards those paths and `/api/*` to the HTTPS origin in
`DJANGO_ORIGIN`, keeping the browser URL on the frontend domain. Set
`DJANGO_ORIGIN=https://<development-api-domain>` in the Vercel project's
Production environment (this project currently deploys the `development`
branch). The local Vite proxy in `vite.config.ts` only serves local development.

The development backend is not deployed yet. At present,
`GET /_allauth/browser/v1/config` on the Vercel URL returns 404. After AWS
development is available, set the Vercel `DJANGO_ORIGIN` value and verify:

1. `GET /_allauth/browser/v1/config` reaches its matching Django instance.
2. Login, logout, and a CSRF-protected request work on the frontend domain.
3. A development login never creates a production session, and vice versa.
4. Kakao's registered redirect URL and Django's `FRONTEND_BASE_URL`, allowed
   hosts, and CSRF trusted origins match that environment's public URLs.
5. An SSR page and a route loader work on the deployed frontend URL. SSR pages
   already return 200; repeat this check after backend routing is configured.

Production gets a separate Vercel project, domain, and backend origin when
that environment is ready.

References: [Vercel React Router guide](https://vercel.com/docs/frameworks/frontend/react-router),
[Vercel external rewrites](https://vercel.com/docs/routing/rewrites),
[Vercel environment variables](https://vercel.com/docs/environment-variables).
