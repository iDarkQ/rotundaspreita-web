"use server";

import { createDeviceSessionQuery, deleteManyDeviceSessionQuery, findDeviceSessionsQuery, updateDeviceSessionQuery } from "@/app/_lib/queries/device-session";


export const serverCreateDeviceSession = async (
    userId: string,
    ipAddress: string,
    userAgent: string,
    jwtToken: string
) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 1);

    await deleteManyDeviceSessionQuery({
        userId,
        lastActive: {
            lt: cutoff,
        },
    });

    const existingDeviceSessions = await findDeviceSessionsQuery({ userId });

    const existingSession = existingDeviceSessions.find(
        (s) => s.ipAddress === ipAddress && s.userAgent === userAgent
    );

    if (existingSession) {
        return updateDeviceSessionQuery({
            id: existingSession.id,
        }, { lastActive: new Date(), });
    }

    const distinctSessions = existingDeviceSessions.reduce((acc, s) => {
        const key = `${s.ipAddress}:${s.userAgent}`;
        if (!acc.includes(key)) acc.push(key);
        return acc;
    }, [] as string[]);

    if (distinctSessions.length >= 4) {
        return;
    }

    return createDeviceSessionQuery({
        user: { connect: { id: userId } },
        ipAddress,
        userAgent,
        jwtToken,
    });
};