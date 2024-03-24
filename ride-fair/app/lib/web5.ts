"use client";
import { Web5 } from "@web5/api";

export const initWeb5 = async () => {
  // @ts-ignore
  const { Web5 } = await import("@web5/api/browser");

  try {
    const { web5, did } = await Web5.connect();

    if (web5 && did) {
      console.log("Web5 initialized");
    }

    return { web5, did };
  } catch (error) {
    console.error("Error initializing Web5:", error);
  }
};
