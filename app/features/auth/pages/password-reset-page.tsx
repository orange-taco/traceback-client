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
  const [confirmationError, setConfirmationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setConfirmationError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("passwordConfirm") ?? "");
    if (key && password !== confirmation) {
      setConfirmationError(authMessages.passwordsDoNotMatch);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = key ? await resetPassword(key, password) : await requestPasswordReset(email);
      setMessage(response.status >= 400 || response.errors?.length
        ? key ? "This reset link is invalid or expired." : "We couldn't send a password reset link. Please try again."
        : key ? "Your password has been changed." : "Check your email for a password reset link.");
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
        {key ? <PasswordFields disabled={isSubmitting} confirmationError={confirmationError} /> : <EmailField disabled={isSubmitting} />}
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
  return <label><span className="meta mb-2 block">Email</span><input name="email" type="email" autoComplete="email" maxLength={authConstraints.emailMaxLength} required disabled={disabled} placeholder="name@example.com" className={inputClass} /></label>;
}

function PasswordFields({ disabled, confirmationError }: { disabled: boolean; confirmationError: string | null }) {
  return (
    <>
      <label><span className="meta mb-2 block">New password</span><input name="password" type="password" autoComplete="new-password" minLength={authConstraints.passwordMinLength} maxLength={authConstraints.passwordMaxLength} required disabled={disabled} placeholder="New password" className={inputClass} /></label>
      <label>
        <span className="meta mb-2 block">Confirm password</span>
        <input name="passwordConfirm" type="password" autoComplete="new-password" minLength={authConstraints.passwordMinLength} maxLength={authConstraints.passwordMaxLength} required disabled={disabled} placeholder="Confirm password" aria-invalid={Boolean(confirmationError)} aria-describedby={confirmationError ? "password-reset-confirm-error" : undefined} className={inputClass} />
        {confirmationError ? <span id="password-reset-confirm-error" className="mt-2 block text-sm text-danger">{confirmationError}</span> : null}
      </label>
    </>
  );
}

const inputClass = "focus-ring w-full border border-border-default bg-surface px-4 py-3 font-mono text-xs tracking-meta";
