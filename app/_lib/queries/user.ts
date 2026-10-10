"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/app/_lib/prisma";

export const createUserQuery = async (data: Prisma.UserCreateInput) =>
  prisma.user.create({ data });

export const findUserQuery = async (where: Prisma.UserWhereUniqueInput) =>
  prisma.user.findUnique({ where });

export const updateUserQuery = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
) => prisma.user.update({ where, data });

export const linkGoogleAccountQuery = async (
  userId: string,
  googleId: string,
) =>
  prisma.user.updateMany({
    where: { id: userId, googleId: null, passwordHash: { not: null } },
    data: { googleId },
  });
