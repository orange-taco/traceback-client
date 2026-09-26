import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { MetaFunction } from "react-router";

import {
  disconnectProvider,
  deleteAccount,
  getConnectedProviders,
  getCurrentSession,
  logout,
} from "~/lib/auth-api";
import type { ConnectedProvider } from "~/features/auth/auth.types";

export const meta: MetaFunction = () => [{ title: "My Account / TRACEBACK" }];

export default function AccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [hasUsablePassword, setHasUsablePassword] = useState<boolean | null>(null);
  const [providers, setProviders] = useState<ConnectedProvider[]>([]);
  const [providerMessage, setProviderMessage] = useState<string | null>(null);
  const [deletePrompt, setDeletePrompt] = useState<ConnectedProvider | "account" | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getCurrentSession().then((response) => {
      if (!response.meta.is_authenticated) {
        navigate("/auth/login", { replace: true });
        return;
      }
      setEmail(response.data?.user?.email ?? "Signed in");
      setHasUsablePassword(response.data?.user?.has_usable_password ?? false);
      getConnectedProviders().then(setProviders).catch(() => setProviderMessage("We couldn't load connected accounts."));
    });
  }, [navigate]);

  async function handleLogout() {
    await logout();
    navigate("/auth/login", { replace: true });
  }

  async function handleDisconnect(provider: ConnectedProvider) {
    setProviderMessage(null);
    try {
      const response = await disconnectProvider(provider.provider.id, provider.uid);
      if (response.status >= 400) {
        if (response.errors?.some((error) => error.code === "no_password")) {
          setDeletePrompt(provider);
          return;
        }
        setProviderMessage(getAccountError(response.errors?.[0]?.code, "We couldn't disconnect this account."));
        return;
      }
      setProviders((current) => current.filter((item) => item.uid !== provider.uid));
    } catch {
      setProviderMessage("We couldn't disconnect this account. Please try again.");
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    setProviderMessage(null);
    try {
      const response = await deleteAccount();
      if (response.status !== 204) {
        setProviderMessage(getAccountError(response.errors?.[0]?.code, "We couldn't delete this account."));
        setDeletePrompt(null);
        return;
      }
      navigate("/auth/login", { replace: true });
    } catch {
      setProviderMessage("We couldn't delete this account. Please try again.");
      setDeletePrompt(null);
    } finally {
      setIsDeleting(false);
    }
  }

  if (!email || hasUsablePassword === null) {
    return <section className="mx-auto max-w-2xl px-4 py-10"><p className="text-sm text-text-secondary">Loading account...</p></section>;
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-8">
      <div className="frame grid gap-5 p-4 md:p-6">
        <p className="meta">My Account</p>
        <div className="h-px bg-border-default" />
        <p className="text-sm text-text-primary">{email}</p>
        <Link to="/auth/password/change" className="text-sm text-action-primary hover:underline">
          {hasUsablePassword ? "Change password" : "Set password"}
        </Link>
        {providers.length > 0 ? (
          <div className="grid gap-3 border-t border-border-default pt-4">
            <p className="meta">Connected accounts</p>
            {providers.map((provider) => (
              <div key={`${provider.provider.id}:${provider.uid}`} className="flex items-center justify-between gap-4 text-sm">
                <span>{provider.provider.name}</span>
                <button type="button" onClick={() => handleDisconnect(provider)} className="focus-ring border border-border-default px-3 py-2 text-xs uppercase text-text-primary">
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <button type="button" onClick={handleLogout} className="focus-ring w-fit border border-border-default px-4 py-3 text-xs uppercase text-text-primary">
          Sign out
        </button>
        <div className="border-t border-border-default pt-4">
          <button type="button" onClick={() => setDeletePrompt("account")} className="focus-ring border border-danger px-4 py-3 text-xs uppercase text-danger">
            Delete account
          </button>
        </div>
        {providerMessage ? <p className="text-xs text-danger" role="alert">{providerMessage}</p> : null}
      </div>
      {deletePrompt ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 px-4" role="presentation">
          <div className="frame w-full max-w-md bg-surface p-5 shadow-xl" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <p id="delete-title" className="meta mb-3 text-danger">Delete account</p>
            <p className="text-sm leading-6 text-text-primary">
              {deletePrompt === "account"
                ? "Your account will be deactivated and anonymized. Connected providers will be unlinked. This cannot be undone."
                : `To disconnect ${deletePrompt.provider.name}, set a password first. You can also delete your account, which cannot be undone.`}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={handleDelete} disabled={isDeleting} className="focus-ring border border-danger px-3 py-2 text-xs uppercase text-danger disabled:opacity-60">
                {isDeleting ? "Deleting..." : "Delete account"}
              </button>
              {deletePrompt !== "account" ? (
                <Link to="/auth/password/change" className="focus-ring border border-border-default px-3 py-2 text-xs uppercase text-text-primary">Set password</Link>
              ) : null}
              <button type="button" onClick={() => setDeletePrompt(null)} disabled={isDeleting} className="focus-ring border border-border-default px-3 py-2 text-xs uppercase text-text-primary disabled:opacity-60">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function getAccountError(code: string | undefined, fallback: string) {
  if (code === "provider_unavailable") return "Kakao is unavailable. Please try again later.";
  return fallback;
}
