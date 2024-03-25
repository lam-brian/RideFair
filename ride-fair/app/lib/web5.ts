"use client";
import { Web5 } from "@web5/api";
import { UserData } from "./definitions";

export const initWeb5: () => Promise<UserData | undefined> = async () => {
  // @ts-ignore
  const { Web5 } = await import("@web5/api/browser");

  try {
    const { web5, did } = await Web5.connect({
      sync: "5s",
    });
    let userData;

    if (web5 && did) {
      console.log("Web5 initialized");
    }

    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          schema: "http://ridefair.com/user",
        },
      },
    });

    if (records !== undefined && records.length > 0) {
      userData = await records.at(-1)?.data.json();
    }

    return userData;
  } catch (error) {
    console.error("Error initializing Web5:", error);
  }
};
