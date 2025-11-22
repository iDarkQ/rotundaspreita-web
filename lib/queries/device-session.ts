"use server";

import { Prisma } from "@/app/generated/prisma/browser";
import prisma from "@/lib/prisma";

export const createDeviceSessionQuery = async (data: Prisma.DeviceSessionCreateInput) => {
    return prisma.deviceSession.create({ data });
}

export const findDeviceSessionsQuery = async (where: Prisma.DeviceSessionWhereInput) => {
    return prisma.deviceSession.findMany({ where });
}

export const deleteDeviceSessionQuery = async (where: Prisma.DeviceSessionWhereUniqueInput) => prisma.deviceSession.delete({ where })

export const updateDeviceSessionQuery = async (where: Prisma.DeviceSessionWhereUniqueInput, data: Prisma.DeviceSessionUpdateInput) => prisma.deviceSession.update({ where, data })