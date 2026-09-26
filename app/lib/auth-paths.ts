export function normalizeReturnTo(value: FormDataEntryValue | string | null) {
  if (typeof value !== "string" || !value.startsWith("/") || value.includes("\\")) {
    return "/";
  }

  try {
    const origin = "https://return-to.invalid";
    const url = new URL(value, origin);
    if (url.origin !== origin || url.pathname.startsWith("/auth/")) {
      return "/";
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export function getKakaoCallbackUrl(returnTo: string) {
  const url = new URL("/auth/kakao/callback", window.location.origin);
  url.searchParams.set("returnTo", normalizeReturnTo(returnTo));
  return url.toString();
}
