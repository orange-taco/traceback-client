import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import type { MetaFunction } from "react-router";

import { verifyEmail } from "~/lib/auth-api";

export const meta: MetaFunction = () => [{ title: "Verify Email / TRACEBACK" }];

export default function VerifyEmailPage() {
  const { key } = useParams();
  const [status, setStatus] = useState<"ready" | "pending" | "verified" | "error">("ready");

  async function handleVerification() {
    if (!key) {
      setStatus("error");
      return;
    }
    setStatus("pending");
    try {
      const response = await verifyEmail(key);
      setStatus(response.errors ? "error" : "verified");
    } catch {
      setStatus("error");
    }
  }

  const message = status === "ready"
    ? "Confirm this email address to finish creating your account."
    : status === "pending"
      ? "Verifying your email."
    : status === "verified"
      ? "Your email is verified. You can now sign in."
      : "This verification link is invalid or expired.";

  return (
    <AuthResult title="Email Verification" message={message}>
      {status === "ready" ? (
        <button type="button" onClick={handleVerification} className="focus-ring min-h-11 bg-action-primary px-5 text-xs uppercase text-white">
          Verify Email
        </button>
      ) : null}
      {status === "verified" || status === "error" ? (
        <Link to="/auth/login" className="text-sm text-action-primary hover:underline">Continue to account</Link>
      ) : null}
    </AuthResult>
  );
}

function AuthResult({ title, message, children }: { title: string; message: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:px-8">
      <div className="frame grid gap-5 p-4 md:p-6">
        <p className="meta">{title}</p>
        <div className="h-px bg-border-default" />
        <p className="text-sm text-text-secondary">{message}</p>
        {children}
      </div>
    </section>
  );
}
