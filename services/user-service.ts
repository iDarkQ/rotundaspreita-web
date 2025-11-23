"use server";

import { User } from "@/app/generated/prisma/browser";
import { GoogleAccountDto } from "@/lib/dtos/user/google-account,dto";
import { createUserQuery, findUserQuery } from "@/lib/queries/user";
import { createDeviceSession } from "@/services/device-session-service";
import { TokenResponse } from "@react-oauth/google";
import axios from "axios";
import { verify } from "crypto";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const secret = process.env.JWT_SECRET;

export const registerUser = async (data: Omit<TokenResponse, "error" | "error_description" | "error_uri">
    , ipAddress: string, userAgent: string) => {
    if (!secret) return;

    const googleData = await fetchGoogleAccountInfo(data.access_token);

    if (!googleData) return;

    const existingUser = await findUserByEmail(googleData.email);

    if (existingUser) {
        const signedUser = await signUser(existingUser);
        if (!signedUser) return;

        const session = await createDeviceSession(existingUser.id, ipAddress, userAgent, signedUser);
        if (!session) return;

        return signedUser;
    }

    const newUser = await createUserQuery({
        email: googleData.email,
        googleId: googleData.sub,
        name: googleData.name,
    });

    const signedUser = await signUser(newUser);
    if (!signedUser) return;

    await createDeviceSession(newUser.id, ipAddress, userAgent, signedUser);
    return signedUser;
}

export const findUserById = async (id: string) => {
    return findUserQuery({ id });
}

export const findUserByEmail = async (email: string) => {
    return findUserQuery({ email });
}

export const authenticate = async (
    jwtToken: string
) => {
    if (!secret) return;

    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for");
    const agent = headersList.get("user-agent");

    const verifyJwt = jwt.verify(jwtToken, secret) as User | null;
    const userId = verifyJwt?.id;

    if (!userId || !ip || !agent) return;

    const user = await findUserById(userId);

    if (!user) return;

    const session = await createDeviceSession(userId, ip, agent, jwtToken);

    if (!session) return;

    return user;
}

export const fetchGoogleAccountInfo = async (token: string) => {
    const req = await axios("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!req.data) return;

    const data = req.data as GoogleAccountDto;

    return data;
}

export const signUser = async (user: User) => {
    if (!secret) return;

    return jwt.sign(user, secret);
}