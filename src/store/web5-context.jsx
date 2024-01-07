import { useState, createContext } from "react";

export const Web5Context = createContext({
  web5Object: {},
  userObject: {},
  initWeb5: () => {},
  initUser: () => {},
});

const Web5Provider = ({ children }) => {
  const [web5Instance, setWeb5Instance] = useState();
  const [user, setUser] = useState();

  const initWeb5 = (web5Obj) => {
    setWeb5Instance(web5Obj);
  };

  const initUser = (userObj) => {
    setUser(userObj);
  };

  return (
    <Web5Context.Provider
      value={{
        web5Object: web5Instance,
        userObject: user,
        initWeb5,
        initUser,
      }}
    >
      {children}
    </Web5Context.Provider>
  );
};

export default Web5Provider;
