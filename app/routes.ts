import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("features/home/pages/home-page.tsx"),
  route("/about", "features/about/pages/about-page.tsx"),
  route("/archive", "features/archive/pages/archive-index-page.tsx"),
  route("/archive/:entry", "features/archive/pages/archive-detail-page.tsx"),
  route("/auth/login", "features/auth/pages/login-page.tsx"),
  route("/account", "features/auth/pages/account-page.tsx"),
  route(
    "/auth/kakao/callback",
    "features/auth/pages/kakao-callback-page.tsx",
  ),
  route(
    "/auth/verify-email/:key",
    "features/auth/pages/verify-email-page.tsx",
  ),
  route(
    "/auth/password/reset/:key?",
    "features/auth/pages/password-reset-page.tsx",
  ),
  route(
    "/auth/password/change",
    "features/auth/pages/password-change-page.tsx",
  ),
  route("/cart", "features/cart/pages/cart-page.tsx"),
  route("/checkout", "features/checkout/pages/checkout-page.tsx"),
  route("/favicon.ico", "routes/favicon.ico.ts"),
  route("/orders/lookup", "features/orders/pages/order-lookup-page.tsx"),
  route("/orders/:orderNumber", "features/orders/pages/order-detail-page.tsx"),
  route("/store", "features/store/pages/store-index-page.tsx"),
  route("/store/:slug", "features/store/pages/product-detail-page.tsx"),
] satisfies RouteConfig;
