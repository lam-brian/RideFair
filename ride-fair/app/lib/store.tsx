"use client";

import { useEffect, useState, createContext, useCallback } from "react";
import { UserData, Web5Instance } from "./definitions";
import { Web5 } from "@web5/api/browser";
import { clearNewUserCookie, setNewUserCookie } from "./server-actions";
import SplashScreen from "../ui/splash-screen";

type StoreType = {
  web5Instance: Web5Instance;
  user: UserData | {};
  createUser: (user: UserData) => Promise<{ message: string } | void>;
};

export const Web5Context = createContext<StoreType>({
  web5Instance: {
    web5: {},
    userDid: "",
  },
  user: {},
  createUser: async () => {},
});

const Web5Provider = ({ children }: { children: React.ReactNode }) => {
  const [web5Instance, setWeb5Instance] = useState<StoreType["web5Instance"]>({
    web5: {},
    userDid: "",
  });
  const [user, setUser] = useState<StoreType["user"]>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initWeb5();

    return () => {
      clearNewUserCookie();
    };
  }, []);

  const initWeb5 = useCallback(async () => {
    // @ts-ignore
    const { Web5 } = await import("@web5/api/browser");

    try {
      const { web5, did: userDid } = await Web5.connect({
        sync: "5s",
      });

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
        return;
      }

      const data = (await records.at(-1)?.data.json()) as UserData;
      console.log(data);
      setUser(data);

      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  return (
    <Web5Context.Provider
      value={{
        web5Instance,
        user,
        createUser,
      }}
    >
      {isLoading ? <SplashScreen /> : children}
    </Web5Context.Provider>
  );
};

export default Web5Provider;
