"use server";

import { Prisma } from "@/app/generated/prisma/browser";
import prisma from "@/app/_lib/prisma";

export const createUserQuery = async (data: Prisma.UserCreateInput) =>
  prisma.user.create({ data });

export const findUserQuery = async (where: Prisma.UserWhereUniqueInput) =>
  prisma.user.findUnique({ where });

export const updateUserQuery = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
) => prisma.user.update({ where, data });
