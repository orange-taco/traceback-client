import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router";
import type { MetaFunction } from "react-router";

import { authConstraints, authMessages } from "~/features/auth/auth-constraints";
import { requestPasswordReset, resetPassword } from "~/lib/auth-api";

export const meta: MetaFunction = () => [{ title: "Reset Password / TRACEBACK" }];

export default function PasswordResetPage() {
  const { key } = useParams();
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("passwordConfirm") ?? "");
    if (key && password !== confirmation) {
      setMessage(authMessages.passwordsDoNotMatch);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = key ? await resetPassword(key, password) : await requestPasswordReset(email);
      setMessage(response.errors ? "This reset link is invalid or expired." : key ? "Your password has been changed." : "Check your email for a password reset link.");
    } catch {
      setMessage("We couldn't process this request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-sm px-4 py-10">
      <form onSubmit={handleSubmit} className="grid gap-4 border border-border-default p-5">
        <p className="meta">Reset Password</p>
        {key ? <PasswordFields disabled={isSubmitting} /> : <EmailField disabled={isSubmitting} />}
        {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
        <button type="submit" disabled={isSubmitting} className="focus-ring min-h-11 bg-action-primary px-5 text-xs uppercase text-white disabled:opacity-60">
          {key ? "Change Password" : "Send Reset Link"}
        </button>
        <Link to="/auth/login" className="text-center text-xs text-action-primary hover:underline">Return to sign in</Link>
      </form>
    </section>
  );
}

function EmailField({ disabled }: { disabled: boolean }) {
  return <input name="email" type="email" autoComplete="email" maxLength={authConstraints.emailMaxLength} required disabled={disabled} placeholder="name@example.com" className={inputClass} />;
}

function PasswordFields({ disabled }: { disabled: boolean }) {
  return (
    <>
      <input name="password" type="password" autoComplete="new-password" minLength={authConstraints.passwordMinLength} maxLength={authConstraints.passwordMaxLength} required disabled={disabled} placeholder="New password" className={inputClass} />
      <input name="passwordConfirm" type="password" autoComplete="new-password" minLength={authConstraints.passwordMinLength} maxLength={authConstraints.passwordMaxLength} required disabled={disabled} placeholder="Confirm password" className={inputClass} />
    </>
  );
}

const inputClass = "focus-ring w-full border border-border-default bg-surface px-4 py-3 font-mono text-xs tracking-meta";
