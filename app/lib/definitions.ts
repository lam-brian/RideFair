import { Web5 } from "@web5/api";

export type UserData = {
  firstName: string;
  lastName: string;
};

export type Web5Instance = {
  web5: Web5 | {};
  userDid: string;
};

export type Ride = {
  id: number;
  locations: RideLocations | undefined;
  car: CarOption | undefined;
  driver: DriverOption | undefined;
  review: Review | undefined;
  total: number | undefined;
  timestamp: string | undefined;
};

export type RideLocations = {
  pickup: string;
  dropOff: string;
};

export type CarOption = {
  type: string;
  eta: string;
  distance: string;
  price: string;
};

export type DriverOption = {
  name: string;
  image: string;
  car: string;
  distance: string;
  rating: string;
  completedTrips: number;
  bestMatch: boolean;
};

export type Review = {
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  tip: number;
};

export type SearchSuggestions = {
  for?: "pickup" | "dropOff";
  suggestions: Suggestion[];
};

export type Suggestion = {
  name: string;
  address: string;
  id: string;
};
