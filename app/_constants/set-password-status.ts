export const SET_PASSWORD_STATUS = {
  SUCCESS: "success",
  INVALID_NEW_PASSWORD: "invalid-new-password",
  ALREADY_SET: "already-set",
  GOOGLE_ACCOUNT_REQUIRED: "google-account-required",
  FAILED: "failed",
} as const;

export type SetPasswordStatus =
  (typeof SET_PASSWORD_STATUS)[keyof typeof SET_PASSWORD_STATUS];
