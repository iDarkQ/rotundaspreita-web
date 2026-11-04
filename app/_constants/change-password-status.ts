export const CHANGE_PASSWORD_STATUS = {
  SUCCESS: "success",
  INVALID_CURRENT_PASSWORD: "invalid-current-password",
  INVALID_NEW_PASSWORD: "invalid-new-password",
  NO_PASSWORD_SET: "no-password-set",
  RATE_LIMITED: "rate-limited",
  FAILED: "failed",
} as const;

export type ChangePasswordStatus =
  (typeof CHANGE_PASSWORD_STATUS)[keyof typeof CHANGE_PASSWORD_STATUS];
