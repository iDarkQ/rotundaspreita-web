"use server";

import { RouteNames } from "@/utils/route-names";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
    const cookie = await cookies();
    cookie.delete("secret");
    redirect(RouteNames.LOGIN);
};