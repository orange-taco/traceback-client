export const authConstraints = {
  emailMaxLength: 254,
  passwordMinLength: 8,
  passwordMaxLength: 128,
} as const;

export const authMessages = {
  emailRequired: "Email is required.",
  emailTooLong: "Email must be 254 characters or less.",
  passwordRequired: "Password is required.",
  passwordTooShort: "Password must be at least 8 characters.",
  passwordTooLong: "Password must be 128 characters or less.",
  passwordsDoNotMatch: "Passwords do not match.",
  checkEmail: "Check your email to finish creating your account.",
  emailVerificationResent: "A new verification email has been sent.",
  duplicateEmail: "This email is already registered. Sign in or continue with Kakao.",
  invalidCredentials: "The email or password is incorrect.",
  invalidSignup: "Please check your email and password and try again.",
  authenticationFailed: "We couldn't sign you in. Please try again.",
  kakaoUnavailable: "Kakao login is temporarily unavailable. Please try again later.",
} as const;
