"use server";

const GRACE_PERIOD_DAYS = 5;

import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { User } from "@/app/generated/prisma/browser";
import { createUserQuery } from "@/app/_lib/queries/user";
import { TokenResponse } from "@react-oauth/google";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import dayjs from "dayjs";
import {
  serverFetchGoogleAccountInfo,
  serverFindUserByEmail,
  serverFindUserById,
  serverSignUser,
} from "@/app/_services/server/user-service";
import { serverFetchUserSubscription } from "@/app/_services/server/subscription-service";
import { serverCreateDeviceSession } from "@/app/_services/server/device-session-service";
import { RouteNames } from "@/app/_utils/route-names";

const defaultAdmins = process.env.DEFAULT_ADMINS;
const secret = process.env.JWT_SECRET;

export const registerUser = async (
  data: Omit<TokenResponse, "error" | "error_description" | "error_uri">,
) => {
  console.log("REGISTER USER CALLED");
  const headersList = await headers();
  const ipAddress = headersList.get("x-forwarded-for");
  const userAgent = headersList.get("user-agent");

  if (!ipAddress || !userAgent) return;
  if (!secret) return;

  const googleData = await serverFetchGoogleAccountInfo(data.access_token);

  if (!googleData) return;

  const existingUser = await serverFindUserByEmail(googleData.email);

  if (existingUser) {
    const signedUser = await serverSignUser(existingUser);
    if (!signedUser) return;

    const session = await serverCreateDeviceSession(
      existingUser.id,
      ipAddress,
      userAgent,
      signedUser,
    );
    if (!session) return;

    return signedUser;
  }

  const admins = defaultAdmins?.split(",");

  const newUser = await createUserQuery({
    email: googleData.email,
    googleId: googleData.sub,
    name: googleData.name,
    admin: admins?.includes(googleData.email),
  });

  const signedUser = await serverSignUser(newUser);
  if (!signedUser) return;

  await serverCreateDeviceSession(newUser.id, ipAddress, userAgent, signedUser);
  return signedUser;
};

export const authenticate = async (jwtToken: string) => {
  if (!secret || jwtToken === "") return;

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for");
  const agent = headersList.get("user-agent");

  const verifyJwt = jwt.verify(jwtToken, secret) as User | null;
  const userId = verifyJwt?.id;

  if (!userId || !ip || !agent) return;

  const user = await serverFindUserById(userId);

  if (!user) return;

  const session = await serverCreateDeviceSession(userId, ip, agent, jwtToken);

  if (!session) return;

  return user;
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
