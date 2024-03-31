"use server";

import { cookies } from "next/headers";

export const clearLoggingCookie = () => {
  cookies().delete("isLoggedIn");
};
