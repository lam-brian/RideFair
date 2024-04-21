"use client";

import { useEffect, useState, createContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Ride, UserData, Web5Instance } from "./definitions";
import { Web5 } from "@web5/api/browser";
import { clearNewUserCookie, setNewUserCookie } from "./server-actions";
import SplashScreen from "../ui/loading/splash-screen";

type StoreType = {
  web5Instance: Web5Instance;
  user: UserData | null;
  rideHistory: Ride[];
  userLocation: {
    latitude: GeolocationCoordinates["latitude"];
    longitude: GeolocationCoordinates["longitude"];
  };
  createUser: (user: UserData) => Promise<{ message: string } | void>;
  addRideToHistory: (ride: Ride) => Promise<{ message: string } | void>;
};

export const Context = createContext<StoreType>({
  web5Instance: {
    web5: {},
    userDid: "",
  },
  user: null,
  rideHistory: [],
  userLocation: {
    latitude: 0,
    longitude: 0,
  },
  createUser: async () => {},
  addRideToHistory: async () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [web5Instance, setWeb5Instance] = useState<StoreType["web5Instance"]>({
    web5: {},
    userDid: "",
  });
  const [user, setUser] = useState<StoreType["user"]>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);
  const [userLocation, setUserLocation] = useState<StoreType["userLocation"]>({
    latitude: 0,
    longitude: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const init = useCallback(async () => {
    // @ts-ignore
    const { Web5 } = await import("@web5/api");

    try {
      const [positionRes, web5Res] = await Promise.all([
        getCurrentLocation(),
        Web5.connect({
          sync: "5s",
        }),
      ]);

      const { coords } = positionRes as GeolocationPosition;
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const { web5, did: userDid } = web5Res;

      setWeb5Instance({
        web5,
        userDid,
      });

      const { records } = await web5.dwn.records.query({
        message: {
          filter: {
            schema: "http://ridefair.com/user",
          },
        },
      });

      if (!records || !records.length) {
        setNewUserCookie();
        router.replace("/onboarding");
        return;
      }

      const data = (await records.at(-1)?.data.json()) as UserData;
      setUser(data);

      const { records: rideRecords } = await web5.dwn.records.query({
        message: {
          filter: {
            schema: "http://ridefair.com/rides",
          },
        },
      });

      if (rideRecords) {
        const rideData = await Promise.all(
          rideRecords.map((rec) => rec.data.json())
        );

        setRideHistory(rideData);
      }
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        alert(err.message);
        return;
      }

      console.log(err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    init();

    return () => {
      clearNewUserCookie();
    };
  }, [init]);

  const getCurrentLocation = async () => {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return position;
  };

  const createUser = async (user: UserData) => {
    try {
      const { web5, userDid } = web5Instance;
      const { record } = await (web5 as Web5).dwn.records.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
        },

        message: {
          schema: "http://ridefair.com/user",
          dataFormat: "application/json",
        },
      });

      if (!record) throw new Error("Something went wrong");

      const response = await record?.send(userDid);

      if (response.status.code !== 202) throw new Error("Something went wrong");

      setUser(user);
      return { message: "User created successfully" };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const addRideToHistory = async (ride: Ride) => {
    try {
      const { web5, userDid } = web5Instance;

      const { record } = await (web5 as Web5).dwn.records.create({
        data: ride,
        message: {
          schema: "http://ridefair.com/rides",
          dataFormat: "application/json",
        },
      });

      if (!record) throw new Error("Something went wrong");

      const response = await record?.send(userDid);

      if (response.status.code !== 202) throw new Error("Something went wrong");

      setRideHistory((state) => [...state, ride]);
      return { message: "User created successfully" };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <Context.Provider
      value={{
        web5Instance,
        user,
        rideHistory,
        userLocation,
        createUser,
        addRideToHistory,
      }}
    >
      {isLoading ? <SplashScreen /> : children}
    </Context.Provider>
  );
};

export default ContextProvider;
