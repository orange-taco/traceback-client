import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import type { MetaFunction } from "react-router";

import { authConstraints, authMessages } from "~/features/auth/auth-constraints";
import { changePassword, getCurrentSession } from "~/lib/auth-api";

export const meta: MetaFunction = () => [{ title: "Change Password / TRACEBACK" }];

export default function PasswordChangePage() {
  const [message, setMessage] = useState<string | null>(null);
  const [confirmationError, setConfirmationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUsablePassword, setHasUsablePassword] = useState<boolean | null>(null);

  useEffect(() => {
    getCurrentSession()
      .then((response) => {
        if (!response.meta.is_authenticated) {
          setMessage("Please sign in before changing your password.");
          return;
        }
        setHasUsablePassword(response.data?.user?.has_usable_password ?? false);
      })
      .catch(() => setMessage("We couldn't load your account. Please try again."));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setConfirmationError(null);
    const form = new FormData(event.currentTarget);
    const currentPassword = hasUsablePassword
      ? String(form.get("currentPassword") ?? "")
      : "";
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmation = String(form.get("passwordConfirm") ?? "");
    if (newPassword !== confirmation) {
      setConfirmationError(authMessages.passwordsDoNotMatch);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await changePassword(currentPassword, newPassword);
      setMessage(
        response.status === 200
          ? "Your password has been changed."
          : getErrorMessage(response.errors?.[0]?.code),
      );
      if (response.status === 200) event.currentTarget.reset();
    } catch {
      setMessage(authMessages.authenticationFailed);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-sm px-4 py-10">
      <form onSubmit={handleSubmit} className="grid gap-4 border border-border-default p-5">
        <p className="meta">{hasUsablePassword ? "Change Password" : "Set Password"}</p>
        {hasUsablePassword ? (
          <label>
            <span className="meta mb-2 block">Current password</span>
            <input name="currentPassword" type="password" autoComplete="current-password" required disabled={isSubmitting} className={inputClass} />
          </label>
        ) : null}
        <label>
          <span className="meta mb-2 block">New password</span>
          <input name="newPassword" type="password" autoComplete="new-password" minLength={authConstraints.passwordMinLength} maxLength={authConstraints.passwordMaxLength} required disabled={isSubmitting} className={inputClass} />
        </label>
        <label>
          <span className="meta mb-2 block">Confirm new password</span>
          <input name="passwordConfirm" type="password" autoComplete="new-password" minLength={authConstraints.passwordMinLength} maxLength={authConstraints.passwordMaxLength} required disabled={isSubmitting} aria-invalid={Boolean(confirmationError)} aria-describedby={confirmationError ? "password-change-confirm-error" : undefined} className={inputClass} />
          {confirmationError ? <span id="password-change-confirm-error" className="mt-2 block text-sm text-danger">{confirmationError}</span> : null}
        </label>
        {message ? <p className="text-sm text-text-secondary">{message}</p> : null}
        <button type="submit" disabled={isSubmitting || hasUsablePassword === null} className="focus-ring min-h-11 bg-action-primary px-5 text-xs uppercase text-white disabled:opacity-60">
          {isSubmitting ? "Saving..." : hasUsablePassword ? "Change password" : "Set password"}
        </button>
        <Link to="/auth/login" className="text-center text-xs text-action-primary hover:underline">Return to account</Link>
      </form>
    </section>
  );
}

function getErrorMessage(code?: string) {
  if (code === "incorrect_password") return "The current password is incorrect.";
  if (code === "password_too_short") return authMessages.passwordTooShort;
  return "We couldn't change your password. Please check the fields and try again.";
}

const inputClass = "focus-ring w-full border border-border-default bg-surface px-4 py-3 font-mono text-xs tracking-meta";
