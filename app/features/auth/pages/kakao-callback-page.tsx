import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { MetaFunction } from "react-router";

import { authMessages } from "~/features/auth/auth-constraints";
import { getCurrentSession } from "~/lib/auth-api";
import { normalizeReturnTo } from "~/lib/auth-paths";

export const meta: MetaFunction = () => [{ title: "Kakao Login / TRACEBACK" }];

export default function KakaoCallbackPage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const returnTo = normalizeReturnTo(searchParams.get("returnTo"));

  useEffect(() => {
    if (searchParams.get("error")) {
      setError(authMessages.kakaoUnavailable);
      return;
    }
    getCurrentSession()
      .then((response) => {
        if (response.meta.is_authenticated) window.location.replace(returnTo);
        else setError(authMessages.authenticationFailed);
      })
      .catch(() => setError(authMessages.authenticationFailed));
  }, [returnTo, searchParams]);

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-8">
      <div className="frame grid gap-5 p-4 md:p-6">
        <p className="meta">{error ? "Sign-In Unsuccessful" : "Signing You In"}</p>
        <div className="h-px bg-border-default" />
        <p className={error ? "text-sm text-danger" : "text-sm text-text-secondary"}>
          {error ?? "Completing your Kakao sign-in."}
        </p>
        {error ? (
          <Link to="/auth/login" className="text-sm text-action-primary hover:underline">Return to sign in</Link>
        ) : null}
      </div>
    </section>
  );
}
