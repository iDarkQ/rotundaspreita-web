"use server";

import { cookies } from "next/headers";

export const saveSecret = async (secret: string) => {
  const cookie = await cookies();

  cookie.set("secret", secret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};
