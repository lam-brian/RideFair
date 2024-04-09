"use server";

import data from "./DATA.json";
import { RideLocations, CarOption } from "./definitions";

import { cookies } from "next/headers";

export const setNewUserCookie = async () => {
  cookies().set("newUser", "true");
};

export const clearNewUserCookie = async () => {
  cookies().delete("newUser");
};

// Mock for now
export const getCarOptions: (
  Location: RideLocations
) => Promise<CarOption[]> = async () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data.carOptions as CarOption[]);
    }, 2000);
  });
};
