# Auth Policy

## Account Identity

- Email is the account identity key.
- Kakao is an authentication provider, not a separate user namespace.
- django-allauth owns email verification, password reset, social login, and
  account linking. Django owns the browser session.

## Signup And Linking

- Email signup is complete only after the confirmation link is accepted.
- A verified Kakao email may authenticate and connect to the matching local
  account. If the local email was not verified, allauth invalidates its
  password before accepting the verified social login.
- Kakao login requires a provider-verified email. The service does not collect
  a replacement email when Kakao does not provide one.
- Provider errors are mapped to short recovery-oriented UI messages; raw
  framework or provider text is not shown.
- Password changes are based on whether the User has a usable password, not on
  which provider was used. Email-only users and linked users with an existing
  password must enter the current password. Social-only users, or linked users
  who have never set a password, set their first password without one.

## Browser Session

- Use the HttpOnly Django session cookie. Do not persist JWTs in localStorage.
- Mutating allauth requests include the Django CSRF token.
- `/_allauth` and `/accounts` remain same-origin public paths in every
  environment.
- React Router does not create a second authentication session.

## Input Limits

- Email: maximum 254 characters.
- Signup password: 8 to 128 characters.
- Login password: 8 to 128 characters.
- Confirm password: required for signup and must match password.
- The backend is authoritative. The frontend mirrors the same limits for better
  UX and smaller invalid payloads.

## Follow-Up

- Add rate limits for signup, password login, and social login.
- Add Google, Apple, and Meta through allauth after provider policy and console
  configuration are approved.
