import { Web5 } from "@web5/api";

export type UserData = {
  firstName: string;
  lastName: string;
};

export type Web5Instance = {
  web5: Web5 | {};
  userDid: string;
};

export type RideLocations = {
  pickup: string;
  dropOff: string;
};
