"use server";

import { cookies } from "next/headers";

export const setNewUserCookie = async () => {
  cookies().set("newUser", "true");
};

export const clearNewUserCookie = async () => {
  cookies().delete("newUser");
};
