"use client";

import { useEffect, useState, createContext } from "react";
import { UserData, Web5Instance } from "./definitions";
import { Web5 } from "@web5/api/browser";

type StoreType = {
  web5Instance: Web5Instance;
  user: UserData | {};
  createUser: (user: UserData) => void;
};

export const Web5Context = createContext<StoreType>({
  web5Instance: {
    web5: {},
    userDid: "",
  },
  user: {},
  createUser: () => {},
});

const Web5Provider = ({ children }: { children: React.ReactNode }) => {
  const [web5Instance, setWeb5Instance] = useState<StoreType["web5Instance"]>({
    web5: {},
    userDid: "",
  });
  const [user, setUser] = useState<StoreType["user"]>({});

  useEffect(() => {
    const initWeb5 = async () => {
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

        if (records && records.length) {
          const data = await records.at(-1)?.data.json();
          console.log(data);
          setUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    initWeb5();
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

      setUser(user);
      record?.send(userDid);
    } catch (err) {
      console.log(err);
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
      {children}
    </Web5Context.Provider>
  );
};

export default Web5Provider;
