import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { MetaFunction } from "react-router";

import { getCurrentSession, logout } from "~/lib/auth-api";

export const meta: MetaFunction = () => [{ title: "My Account / TRACEBACK" }];

export default function AccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [hasUsablePassword, setHasUsablePassword] = useState<boolean | null>(null);

  useEffect(() => {
    getCurrentSession().then((response) => {
      if (!response.meta.is_authenticated) {
        navigate("/auth/login", { replace: true });
        return;
      }
      setEmail(response.data?.user?.email ?? "Signed in");
      setHasUsablePassword(response.data?.user?.has_usable_password ?? false);
    });
  }, [navigate]);

  async function handleLogout() {
    await logout();
    navigate("/auth/login", { replace: true });
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
        <button type="button" onClick={handleLogout} className="focus-ring w-fit border border-border-default px-4 py-3 text-xs uppercase text-text-primary">
          Sign out
        </button>
      </div>
    </section>
  );
}
