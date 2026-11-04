"use server";

const GRACE_PERIOD_DAYS = 5;
const MIN_PASSWORD_LENGTH = 8;

import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { USER_REGISTRATION_STATUS } from "@/app/_constants/user-registration-status";
import { USER_LOGIN_STATUS } from "@/app/_constants/user-login-status";
import {
  createUserQuery,
  setPasswordIfUnsetQuery,
  updateUserQuery,
} from "@/app/_lib/queries/user";
import { Prisma, User } from "@/app/generated/prisma/client";
import { TokenResponse } from "@react-oauth/google";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import dayjs from "dayjs";
import {
  serverHashPassword,
  serverVerifyPassword,
} from "@/app/_services/server/password-service";
import { serverConsumeLoginAttempt } from "@/app/_services/server/login-rate-limit-service";
import {
  serverFetchGoogleAccountInfo,
  serverFindUserByEmail,
  serverFindUserById,
  serverLinkGoogleAccount,
  serverSignUser,
} from "@/app/_services/server/user-service";
import { serverFetchUserSubscription } from "@/app/_services/server/subscription-service";
import { serverCreateDeviceSession } from "@/app/_services/server/device-session-service";
import { RouteNames } from "@/app/_utils/route-names";
import {
  CHANGE_PASSWORD_STATUS,
  ChangePasswordStatus,
} from "@/app/_constants/change-password-status";
import {
  SET_PASSWORD_STATUS,
  SetPasswordStatus,
} from "@/app/_constants/set-password-status";

const defaultAdmins = process.env.DEFAULT_ADMINS;
const secret = process.env.JWT_SECRET;

interface RegisterCredentialsInput {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

interface LoginCredentialsInput {
  email: string;
  password: string;
}

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const isValidEmail = (email: string) =>
  email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const buildFullName = (name: string, lastName: string) =>
  `${name.trim()} ${lastName.trim()}`.trim();

const getAdminEmails = () =>
  defaultAdmins
    ?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean) ?? [];

const getRequestMetadata = async () => {
  const headersList = await headers();
  const ipAddress = headersList.get("x-forwarded-for");
  const userAgent = headersList.get("user-agent");

  if (!ipAddress || !userAgent) return;

  return { ipAddress, userAgent };
};

export type UserRegistrationResult =
  | {
      status: typeof USER_REGISTRATION_STATUS.SUCCESS;
      secret: string;
    }
  | {
      status: typeof USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED;
    };

export type UserLoginResult =
  | {
      status: typeof USER_LOGIN_STATUS.SUCCESS;
      secret: string;
    }
  | {
      status: typeof USER_LOGIN_STATUS.RATE_LIMITED;
    };

export const registerUser = async (
  data: Omit<TokenResponse, "error" | "error_description" | "error_uri">,
): Promise<UserRegistrationResult | undefined> => {
  const requestMetadata = await getRequestMetadata();
  if (!requestMetadata) return;
  if (!secret) return;

  const googleData = await serverFetchGoogleAccountInfo(data.access_token);

  if (!googleData) return;

  const normalizedEmail = normalizeEmail(googleData.email);
  const existingUser = await serverFindUserByEmail(normalizedEmail);

  if (existingUser) {
    let userToSignIn = existingUser;

    if (existingUser.googleId !== googleData.sub) {
      if (
        existingUser.googleId !== null ||
        !existingUser.passwordHash ||
        googleData.email_verified !== true
      ) {
        return { status: USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED };
      }

      try {
        const linkResult = await serverLinkGoogleAccount(
          existingUser.id,
          googleData.sub,
        );

        if (linkResult.count === 0) {
          const latestUser = await serverFindUserByEmail(normalizedEmail);
          if (latestUser?.googleId !== googleData.sub) {
            return {
              status: USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED,
            };
          }
          userToSignIn = latestUser;
        }
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          return { status: USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED };
        }

        throw error;
      }
    }

    const signedUser = await serverSignUser(userToSignIn);
    if (!signedUser) return;

    const session = await serverCreateDeviceSession(
      userToSignIn.id,
      requestMetadata.ipAddress,
      requestMetadata.userAgent,
      signedUser,
    );
    if (!session) return;

    return { status: USER_REGISTRATION_STATUS.SUCCESS, secret: signedUser };
  }

  const admins = getAdminEmails();

  let newUser: User;
  try {
    newUser = await createUserQuery({
      email: normalizedEmail,
      googleId: googleData.sub,
      name: googleData.name,
      admin: admins.includes(normalizedEmail),
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { status: USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED };
    }

    throw error;
  }

  const signedUser = await serverSignUser(newUser);
  if (!signedUser) return;

  await serverCreateDeviceSession(
    newUser.id,
    requestMetadata.ipAddress,
    requestMetadata.userAgent,
    signedUser,
  );
  return { status: USER_REGISTRATION_STATUS.SUCCESS, secret: signedUser };
};

export const registerUserWithCredentials = async ({
  email,
  password,
  name,
  lastName,
}: RegisterCredentialsInput): Promise<UserRegistrationResult | undefined> => {
  const requestMetadata = await getRequestMetadata();
  if (!requestMetadata) return;
  if (!secret) return;

  const normalizedEmail = normalizeEmail(email);
  const trimmedPassword = password.trim();
  const fullName = buildFullName(name, lastName);

  if (!isValidEmail(normalizedEmail) || !fullName) return;
  if (trimmedPassword.length < MIN_PASSWORD_LENGTH) return;

  const existingUser = await serverFindUserByEmail(normalizedEmail);
  if (existingUser) {
    return { status: USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED };
  }

  const admins = getAdminEmails();
  const passwordHash = await serverHashPassword(trimmedPassword);

  let newUser: User;
  try {
    newUser = await createUserQuery({
      email: normalizedEmail,
      name: fullName,
      passwordHash,
      admin: admins.includes(normalizedEmail),
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { status: USER_REGISTRATION_STATUS.EMAIL_ALREADY_REGISTERED };
    }

    throw error;
  }

  const signedUser = await serverSignUser(newUser);
  if (!signedUser) return;

  await serverCreateDeviceSession(
    newUser.id,
    requestMetadata.ipAddress,
    requestMetadata.userAgent,
    signedUser,
  );

  return { status: USER_REGISTRATION_STATUS.SUCCESS, secret: signedUser };
};

export const loginUserWithCredentials = async ({
  email,
  password,
}: LoginCredentialsInput): Promise<UserLoginResult | undefined> => {
  const requestMetadata = await getRequestMetadata();
  if (!requestMetadata) return;
  if (!secret) return;

  const normalizedEmail = normalizeEmail(email);
  const trimmedPassword = password.trim();

  if (!normalizedEmail || !trimmedPassword) return;

  const rateLimitResult = await serverConsumeLoginAttempt(
    normalizedEmail,
    requestMetadata.ipAddress,
  );
  if (rateLimitResult === "limited") {
    return { status: USER_LOGIN_STATUS.RATE_LIMITED };
  }
  if (rateLimitResult !== "allowed") return;

  const user = await serverFindUserByEmail(normalizedEmail);
  if (!user || !user.passwordHash) return;

  const validPassword = await serverVerifyPassword(
    trimmedPassword,
    user.passwordHash,
  );

  if (!validPassword) return;

  const signedUser = await serverSignUser(user);
  if (!signedUser) return;

  await serverCreateDeviceSession(
    user.id,
    requestMetadata.ipAddress,
    requestMetadata.userAgent,
    signedUser,
  );

  return { status: USER_LOGIN_STATUS.SUCCESS, secret: signedUser };
};

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordInput): Promise<ChangePasswordStatus> => {
  const requestMetadata = await getRequestMetadata();
  if (!requestMetadata) return CHANGE_PASSWORD_STATUS.FAILED;

  const user = await fetchLoggedUser();
  if (!user) return CHANGE_PASSWORD_STATUS.FAILED;
  if (!user.passwordHash) return CHANGE_PASSWORD_STATUS.NO_PASSWORD_SET;

  const trimmedCurrentPassword = currentPassword.trim();
  const trimmedNewPassword = newPassword.trim();

  if (!trimmedCurrentPassword) {
    return CHANGE_PASSWORD_STATUS.INVALID_CURRENT_PASSWORD;
  }
  if (trimmedNewPassword.length < MIN_PASSWORD_LENGTH) {
    return CHANGE_PASSWORD_STATUS.INVALID_NEW_PASSWORD;
  }

  // Shares the login limiter so the current password cannot be brute-forced from here.
  const rateLimitResult = await serverConsumeLoginAttempt(
    user.email,
    requestMetadata.ipAddress,
  );
  if (rateLimitResult === "limited") return CHANGE_PASSWORD_STATUS.RATE_LIMITED;
  if (rateLimitResult !== "allowed") return CHANGE_PASSWORD_STATUS.FAILED;

  const validPassword = await serverVerifyPassword(
    trimmedCurrentPassword,
    user.passwordHash,
  );
  if (!validPassword) return CHANGE_PASSWORD_STATUS.INVALID_CURRENT_PASSWORD;

  await updateUserQuery(
    { id: user.id },
    { passwordHash: await serverHashPassword(trimmedNewPassword) },
  );

  return CHANGE_PASSWORD_STATUS.SUCCESS;
};

export const setAccountPassword = async (
  newPassword: string,
): Promise<SetPasswordStatus> => {
  const user = await fetchLoggedUser();
  if (!user) return SET_PASSWORD_STATUS.FAILED;
  if (!user.googleId) return SET_PASSWORD_STATUS.GOOGLE_ACCOUNT_REQUIRED;
  if (user.passwordHash) return SET_PASSWORD_STATUS.ALREADY_SET;

  const trimmedPassword = newPassword.trim();
  if (trimmedPassword.length < MIN_PASSWORD_LENGTH) {
    return SET_PASSWORD_STATUS.INVALID_NEW_PASSWORD;
  }

  const result = await setPasswordIfUnsetQuery(
    user.id,
    await serverHashPassword(trimmedPassword),
  );

  return result.count === 1
    ? SET_PASSWORD_STATUS.SUCCESS
    : SET_PASSWORD_STATUS.ALREADY_SET;
};

export const authenticate = async (jwtToken: string) => {
  if (!secret || jwtToken === "") return;

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for");
  const agent = headersList.get("user-agent");

  try {
    const verifyJwt = jwt.verify(jwtToken, secret) as { id?: string } | null;
    const userId = verifyJwt?.id;

    if (!userId || !ip || !agent) return;

    const user = await serverFindUserById(userId);

    if (!user) return;

    const session = await serverCreateDeviceSession(
      userId,
      ip,
      agent,
      jwtToken,
    );

    if (!session) return;

    return user;
  } catch {
    return;
  }
};

export const verifySession = cache(async () => {
  const user = await fetchLoggedUser();

  if (!user) {
    redirect(RouteNames.LOGIN);
  }

  return user;
});

export const verifyOnboardingComplete = cache(async () => {
  const user = await verifySession();

  if (!user.onboardingCompleted && !user.onboardingDeferredAt) {
    redirect(RouteNames.ONBOARDING);
  }

  return user;
});

export const verifySessionSubscription = cache(async () => {
  const access = await verifyAccess();

  return access?.session;
});

export const verifyAccess = cache(async () => {
  const session = await verifySession();
  if (!session) return;

  if (session.admin) {
    return { session, freeTrial: false };
  }

  const subscription = await serverFetchUserSubscription(session.id);

  const hasValidSubscription =
    subscription &&
    dayjs(subscription.expiresAt)
      .add(GRACE_PERIOD_DAYS, "day")
      .isAfter(dayjs());

  if (hasValidSubscription) {
    return { session, freeTrial: false };
  }

  if (!session.usedFreeTest) {
    return { session, freeTrial: true };
  }

  return;
});

export const verifyAdminPermissions = cache(async () => {
  const session = await verifySession();
  if (!session || !session.admin) return;

  return session;
});
