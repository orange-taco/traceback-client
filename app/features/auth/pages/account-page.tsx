import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { MetaFunction } from "react-router";

import {
  disconnectProvider,
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
    const response = await disconnectProvider(provider.provider.id, provider.uid);
    if (response.status >= 400) {
      setProviderMessage(response.errors?.[0]?.message ?? "This account cannot be disconnected yet.");
      return;
    }
    setProviders((current) => current.filter((item) => item.uid !== provider.uid));
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
            {providerMessage ? <p className="text-xs text-danger">{providerMessage}</p> : null}
          </div>
        ) : null}
        <button type="button" onClick={handleLogout} className="focus-ring w-fit border border-border-default px-4 py-3 text-xs uppercase text-text-primary">
          Sign out
        </button>
      </div>
    </section>
  );
}
