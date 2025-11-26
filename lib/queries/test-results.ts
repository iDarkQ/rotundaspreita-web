"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export const createTestResultQuery = async (data: Prisma.TestResultCreateInput) => prisma.testResult.create({ data });

export const fetchTestResultsQuery = async (where: Prisma.TestResultWhereInput) => prisma.testResult.findMany({ where });