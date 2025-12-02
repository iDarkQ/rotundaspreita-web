"use server";

import { RouteNames } from "@/app/_utils/route-names";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
    const cookie = await cookies();
    cookie.delete("secret");
    redirect(RouteNames.LOGIN);
};