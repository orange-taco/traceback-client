import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useSearchParams } from "react-router";
import type { MetaFunction } from "react-router";

import { authConstraints, authMessages } from "~/features/auth/auth-constraints";
import type { AllauthResponse, AuthIntent } from "~/features/auth/auth.types";
import {
  getCurrentSession,
  loginWithEmail,
  logout,
  resendEmailVerification,
  signupWithEmail,
  submitKakaoLogin,
} from "~/lib/auth-api";
import { getKakaoCallbackUrl, normalizeReturnTo } from "~/lib/auth-paths";

export const meta: MetaFunction = () => [{ title: "Account / TRACEBACK" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const returnTo = normalizeReturnTo(searchParams.get("returnTo"));

  useEffect(() => {
    getCurrentSession().then((response) => {
      if (response.meta.is_authenticated) {
        setEmail(response.data?.user?.email ?? "Signed in");
      }
    });
  }, []);

  return (
    <AuthLayout>
      {email ? (
        <SignedInPanel email={email} onSignedOut={() => setEmail(null)} />
      ) : (
        <AuthPanel returnTo={returnTo} />
      )}
    </AuthLayout>
  );
}

function AuthPanel({ returnTo }: { returnTo: string }) {
  const [mode, setMode] = useState<AuthIntent>("login");
  const [message, setMessage] = useState<string | null>(null);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setVerificationEmail(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("passwordConfirm") ?? "");
    if (mode === "signup" && password !== confirmation) {
      setMessage(authMessages.passwordsDoNotMatch);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authenticate(mode, email, password);
      if (response.meta.is_authenticated) window.location.assign(returnTo);
      else {
        setMessage(getResponseMessage(response, mode));
        if (mode === "signup" && hasEmailVerificationFlow(response)) {
          setVerificationEmail(email);
        }
      }
    } catch {
      setMessage(authMessages.authenticationFailed);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <KakaoLoginButton returnTo={returnTo} disabled={isSubmitting} />
      <ModeSelector mode={mode} onChange={setMode} />
      <form onSubmit={handleSubmit} className="grid gap-4">
        <AuthFields mode={mode} disabled={isSubmitting} />
        {message ? <AuthMessage message={message} /> : null}
        {verificationEmail ? (
          <ResendVerification email={verificationEmail} onMessage={setMessage} />
        ) : null}
        <button type="submit" disabled={isSubmitting} className={primaryButtonClass}>
          {mode === "signup" ? "Create Account" : "Sign In"}
        </button>
      </form>
    </>
  );
}

function ResendVerification({
  email,
  onMessage,
}: {
  email: string;
  onMessage: (message: string) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleResend() {
    setIsSubmitting(true);
    try {
      const response = await resendEmailVerification(email);
      onMessage(response.status === 200 ? authMessages.emailVerificationResent : authMessages.authenticationFailed);
    } catch {
      onMessage(authMessages.authenticationFailed);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={isSubmitting}
      className="focus-ring text-left text-xs text-action-primary hover:underline disabled:opacity-60"
    >
      {isSubmitting ? "Sending..." : "Resend verification email"}
    </button>
  );
}

function AuthFields({ mode, disabled }: { mode: AuthIntent; disabled: boolean }) {
  return (
    <>
      <AuthInput label="Email" name="email" type="email" autoComplete="email" disabled={disabled} />
      <AuthInput label="Password" name="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} disabled={disabled} />
      {mode === "signup" ? (
        <AuthInput label="Confirm Password" name="passwordConfirm" type="password" autoComplete="new-password" disabled={disabled} />
      ) : null}
      {mode === "login" ? (
        <Link to="/auth/password/reset" className="text-right text-xs text-action-primary hover:underline">
          Forgot password?
        </Link>
      ) : null}
    </>
  );
}

function AuthInput(props: { label: string; name: string; type: "email" | "password"; autoComplete: string; disabled: boolean }) {
  const maxLength = props.type === "password" ? authConstraints.passwordMaxLength : authConstraints.emailMaxLength;
  return (
    <label>
      <span className="meta mb-2 block">{props.label}</span>
      <input
        name={props.name}
        type={props.type}
        autoComplete={props.autoComplete}
        disabled={props.disabled}
        required
        minLength={props.type === "password" ? authConstraints.passwordMinLength : undefined}
        maxLength={maxLength}
        className="focus-ring w-full border border-border-default bg-surface px-4 py-3 font-mono text-xs tracking-meta"
      />
    </label>
  );
}

function KakaoLoginButton({ returnTo, disabled }: { returnTo: string; disabled: boolean }) {
  const [error, setError] = useState<string | null>(null);
  async function handleClick() {
    setError(null);
    try {
      await submitKakaoLogin(getKakaoCallbackUrl(returnTo));
    } catch {
      setError(authMessages.kakaoUnavailable);
    }
  }
  return (
    <div className="mb-4 grid gap-3">
      <button type="button" onClick={handleClick} disabled={disabled} className="focus-ring h-[45px] overflow-hidden rounded-[12px] disabled:opacity-60">
        <img src="/auth/kakao-login-full-large-wide-en.png" alt="Login with Kakao" width={300} height={45} />
      </button>
      {error ? <AuthMessage message={error} /> : null}
    </div>
  );
}

function ModeSelector({ mode, onChange }: { mode: AuthIntent; onChange: (mode: AuthIntent) => void }) {
  return (
    <div className="mb-4 grid grid-cols-2 border border-border-default bg-surface font-mono text-[11px] uppercase tracking-meta">
      {(["login", "signup"] as const).map((item) => (
        <button key={item} type="button" onClick={() => onChange(item)} aria-pressed={mode === item} className={getModeButtonClass(mode === item)}>
          {item === "login" ? "Sign In" : "Create"}
        </button>
      ))}
    </div>
  );
}

function SignedInPanel({ email, onSignedOut }: { email: string; onSignedOut: () => void }) {
  async function handleLogout() {
    await logout();
    onSignedOut();
  }
  return (
    <div className="grid gap-4 border border-border-default p-5 text-center">
      <p className="text-sm text-text-primary">{email}</p>
      <Link to="/auth/password/change" className="text-xs text-action-primary hover:underline">
        Change password
      </Link>
      <button type="button" onClick={handleLogout} className={primaryButtonClass}>Sign Out</button>
    </div>
  );
}

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-[calc(100dvh-6.5625rem)] items-center justify-center bg-background px-4 py-10 md:min-h-[calc(100dvh-4.0625rem)]">
      <div className="w-full max-w-[300px]">
        <div className="mb-8 text-center">
          <p className="meta mb-3">Account</p>
          <h1 className="font-mono text-2xl uppercase tracking-widebrand">TRACEBACK</h1>
        </div>
        {children}
      </div>
    </section>
  );
}

function AuthMessage({ message }: { message: string }) {
  return <p className="border border-danger/30 bg-danger/10 px-3 py-2 text-xs leading-5 text-danger">{message}</p>;
}

function authenticate(mode: AuthIntent, email: string, password: string) {
  return mode === "signup" ? signupWithEmail(email, password) : loginWithEmail(email, password);
}

function getResponseMessage(response: AllauthResponse, mode: AuthIntent) {
  if (response.data?.flows?.some((flow) => flow.id === "verify_email")) return authMessages.checkEmail;
  const code = response.errors?.[0]?.code;
  if (code === "email_password_mismatch") return authMessages.invalidCredentials;
  if (code === "email_taken") return authMessages.duplicateEmail;
  return mode === "signup" ? authMessages.invalidSignup : authMessages.authenticationFailed;
}

function hasEmailVerificationFlow(response: AllauthResponse) {
  return response.data?.flows?.some((flow) => flow.id === "verify_email") ?? false;
}

function getModeButtonClass(isActive: boolean) {
  return `focus-ring min-h-11 px-4 py-3 transition ${isActive ? "bg-action-soft text-action-primary" : "text-text-secondary hover:bg-surface-subtle"}`;
}

const primaryButtonClass = "focus-ring inline-flex min-h-11 items-center justify-center border border-action-primary bg-action-primary px-5 py-3 font-mono text-[11px] uppercase tracking-meta text-white transition hover:bg-action-primary-hover disabled:opacity-60";
