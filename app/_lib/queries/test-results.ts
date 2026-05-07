"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/app/_lib/prisma";

export const createTestResultQuery = async (
  data: Prisma.TestResultCreateInput,
) => prisma.testResult.create({ data });

export const fetchTestResultsQuery = async (
  where: Prisma.TestResultWhereInput,
) => prisma.testResult.findMany({ where });

export const fetchLastTestResultsQuery = async (
  where: Prisma.TestResultWhereInput,
  orderBy: Prisma.TestResultOrderByWithRelationInput,
  take?: number,
) => prisma.testResult.findMany({ where, take, orderBy });

export const updateManyTestsResultsQuery = async (
  where: Prisma.TestResultWhereInput,
  data: Prisma.TestResultUpdateManyMutationInput,
) => prisma.testResult.updateMany({ where, data });
