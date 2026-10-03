const configuredOrigin = process.env.DJANGO_ORIGIN?.trim();

let djangoOrigin: string | undefined;

if (configuredOrigin) {
  const parsedOrigin = new URL(configuredOrigin);
  if (
    parsedOrigin.protocol !== "https:" ||
    parsedOrigin.pathname !== "/" ||
    parsedOrigin.search ||
    parsedOrigin.hash ||
    parsedOrigin.username ||
    parsedOrigin.password
  ) {
    throw new Error("DJANGO_ORIGIN must be an HTTPS origin without a path, query, or credentials");
  }
  djangoOrigin = parsedOrigin.origin;
}

export const config = {
  rewrites: djangoOrigin
    ? [
        {
          source: "/_allauth/:path*",
          destination: `${djangoOrigin}/_allauth/:path*`,
        },
        {
          source: "/accounts/:path*",
          destination: `${djangoOrigin}/accounts/:path*`,
        },
        {
          source: "/api/:path*",
          destination: `${djangoOrigin}/api/:path*`,
        },
      ]
    : [],
};
