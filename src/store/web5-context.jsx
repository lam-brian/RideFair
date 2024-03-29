import { useEffect, useState, createContext } from "react";
import { Web5 } from "@web5/api/browser";

export const Web5Context = createContext({
  web5Instance: {
    web5: {},
    userDid: "",
  },
  user: {},
  initUser: () => {},
});

const Web5Provider = ({ children }) => {
  const [web5Instance, setWeb5Instance] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const initWeb5 = async () => {
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

        if (records.length) {
          const data = await records.at(-1).data.json();
          console.log(data);
          setUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    initWeb5();
  }, []);

  return (
    <Web5Context.Provider
      value={{
        web5Instance,
        user,
        initUser: (user) => {
          setUser(user);
        },
      }}
    >
      {children}
    </Web5Context.Provider>
  );
};

export default Web5Provider;
