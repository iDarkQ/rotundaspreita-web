"use server";

import { authenticate } from "@/app/_services/user-service";
import { cookies } from "next/headers";

export const fetchLoggedUser = async () => {
  const cookie = await cookies();
  const jwtToken = cookie.get("secret");

  const user = jwtToken ? await authenticate(jwtToken.value) : null;
  return user;
};
