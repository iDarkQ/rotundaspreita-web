"use server";

import { Prisma } from "@/app/generated/prisma/browser";
import prisma from "@/app/_lib/prisma";

export const createDeviceSessionQuery = async (
  data: Prisma.DeviceSessionCreateInput,
) => prisma.deviceSession.create({ data });

export const findDeviceSessionsQuery = async (
  where: Prisma.DeviceSessionWhereInput,
) => prisma.deviceSession.findMany({ where });

export const deleteDeviceSessionQuery = async (
  where: Prisma.DeviceSessionWhereUniqueInput,
) => prisma.deviceSession.delete({ where });
export const deleteManyDeviceSessionQuery = async (
  where: Prisma.DeviceSessionWhereInput,
) => prisma.deviceSession.deleteMany({ where });

export const updateDeviceSessionQuery = async (
  where: Prisma.DeviceSessionWhereUniqueInput,
  data: Prisma.DeviceSessionUpdateInput,
) => prisma.deviceSession.update({ where, data });
