export function normalizeReturnTo(value: FormDataEntryValue | string | null) {
  if (typeof value !== "string" || !value.startsWith("/")) {
    return "/";
  }

  if (value.startsWith("//") || value.startsWith("/auth/")) {
    return "/";
  }

  return value;
}

export function getKakaoCallbackUrl(returnTo: string) {
  const url = new URL("/auth/kakao/callback", window.location.origin);
  url.searchParams.set("returnTo", normalizeReturnTo(returnTo));
  return url.toString();
}
