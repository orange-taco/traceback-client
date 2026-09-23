import type { AllauthResponse, ConnectedProvider } from "~/features/auth/auth.types";

const authBasePath = "/_allauth/browser/v1";
const customAccountsBasePath = "/accounts";

export function getCurrentSession() {
  return requestAuth("GET", "/auth/session");
}

export async function getConnectedProviders() {
  const response = await requestAuth("GET", "/account/providers");
  return (response.data as unknown as ConnectedProvider[] | undefined) ?? [];
}

export function disconnectProvider(provider: string, account: string) {
  return requestAuth("DELETE", "/account/providers", { provider, account });
}

export function deleteAccount() {
  return requestCustomAccounts("DELETE", "/delete");
}

export function loginWithEmail(email: string, password: string) {
  return requestAuth("POST", "/auth/login", { email, password });
}

export function signupWithEmail(email: string, password: string) {
  return requestAuth("POST", "/auth/signup", { email, password });
}

export function verifyEmail(key: string) {
  return requestAuth("POST", "/auth/email/verify", { key });
}

export function resendEmailVerification(email: string) {
  return requestCustomAccounts("POST", "/email/verify/resend", { email });
}

export function requestPasswordReset(email: string) {
  return requestAuth("POST", "/auth/password/request", { email });
}

export function resetPassword(key: string, password: string) {
  return requestAuth("POST", "/auth/password/reset", { key, password });
}

export function changePassword(currentPassword: string, newPassword: string) {
  const payload = { new_password: newPassword };
  return requestAuth(
    "POST",
    "/account/password/change",
    currentPassword ? { current_password: currentPassword, ...payload } : payload,
  );
}

export function logout() {
  return requestAuth("DELETE", "/auth/session");
}

export async function submitKakaoLogin(callbackUrl: string) {
  const csrfToken = await ensureCsrfToken();
  const form = document.createElement("form");
  form.method = "post";
  form.action = `${authBasePath}/auth/provider/redirect`;
  appendInput(form, "provider", "kakao");
  appendInput(form, "process", "login");
  appendInput(form, "callback_url", callbackUrl);
  appendInput(form, "csrfmiddlewaretoken", csrfToken);
  document.body.append(form);
  form.submit();
}

async function requestAuth(
  method: "GET" | "POST" | "DELETE",
  path: string,
  payload?: Record<string, string>,
) {
  return requestBase(authBasePath, method, path, payload);
}

async function requestCustomAccounts(
  method: "GET" | "POST" | "DELETE",
  path: string,
  payload?: Record<string, string>,
) {
  return requestBase(customAccountsBasePath, method, path, payload);
}

async function requestBase(
  basePath: string,
  method: "GET" | "POST" | "DELETE",
  path: string,
  payload?: Record<string, string>,
) {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (method !== "GET") {
    headers["Content-Type"] = "application/json";
    headers["X-CSRFToken"] = await ensureCsrfToken();
  }
  const response = await fetch(`${basePath}${path}`, {
    method,
    credentials: "same-origin",
    headers,
    body: payload ? JSON.stringify(payload) : undefined,
  });
  if (response.status === 204) {
    return {
      status: 204,
      meta: { is_authenticated: false },
    } as AllauthResponse;
  }
  const data = (await response.json()) as Partial<AllauthResponse>;
  return {
    ...data,
    status: data.status ?? response.status,
    meta: data.meta ?? { is_authenticated: false },
  } as AllauthResponse;
}

async function ensureCsrfToken() {
  let token = readCookie("csrftoken");
  if (token) return token;

  await fetch(`${authBasePath}/config`, {
    credentials: "same-origin",
    headers: { Accept: "application/json" },
  });
  token = readCookie("csrftoken");
  if (!token) throw new Error("CSRF token was not issued.");
  return token;
}

function readCookie(name: string) {
  const prefix = `${encodeURIComponent(name)}=`;
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return value ? decodeURIComponent(value.slice(prefix.length)) : null;
}

function appendInput(form: HTMLFormElement, name: string, value: string) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  form.append(input);
}
