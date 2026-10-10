"use server";

const GRACE_PERIOD_DAYS = 5;
const MIN_PASSWORD_LENGTH = 8;

import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { USER_REGISTRATION_STATUS } from "@/app/_constants/user-registration-status";
import { USER_LOGIN_STATUS } from "@/app/_constants/user-login-status";
import { createUserQuery } from "@/app/_lib/queries/user";
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

const defaultAdmins = process.env.DEFAULT_ADMINS;
const secret = process.env.JWT_SECRET;

interface RegisterCredentialsInput {
  email: string;
  password: string;
  name: string;
  lastName: string;
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

export const verifySessionSubscription = cache(async () => {
  const session = await verifySession();
  if (!session) return;

  if (session.admin) {
    return session;
  }

  const subscription = await serverFetchUserSubscription(session.id);

  const hasValidSubscription =
    subscription &&
    dayjs(subscription.expiresAt)
      .add(GRACE_PERIOD_DAYS, "day")
      .isAfter(dayjs());

  if (hasValidSubscription || !session.usedFreeTest) {
    return session;
  }

  return;
});

export const verifyAdminPermissions = cache(async () => {
  const session = await verifySession();
  if (!session || !session.admin) return;

  return session;
});
