"use server";

import data from "./DATA.json";
import { RideLocations, CarOption, DriverOption } from "./definitions";

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
      res(data.carOptions);
    }, 3000);
  });
};

// Mock for now
export const getDriverOptions: (
  car: CarOption
) => Promise<DriverOption[]> = async () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data.driverOptions);
    }, 3000);
  });
};
