import { useEffect, useContext, useState } from "react";
import { Web5Context } from "./store/web5-context";
import { Web5 } from "@web5/api/browser";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Onboarding from "./pages/Onboarding/Onboading";
import SignUp from "./pages/SignUp/SignUp";

const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Navigate to="/signup" />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/signup" element={<SignUp />} />
  </Route>
);

const authRoutes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Home />} />
    <Route path="/*" element={<Navigate to="/" />} />
  </Route>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const web5Ctx = useContext(Web5Context);
  let usedRoutes;

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did: userDid } = await Web5.connect({
        sync: "5s",
        techPreview: {
          dwnEndpoints: ["http://localhost:3000"],
        },
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
        web5Ctx.initUser(data);
        setIsLoggedIn(true);
      }

      web5Ctx.initWeb5({
        web5,
        userDid,
      });
    };
    initWeb5();
  }, []);

  if (isLoggedIn) {
    usedRoutes = authRoutes;
  } else {
    usedRoutes = routes;
  }

  const router = createBrowserRouter(usedRoutes);

  return <RouterProvider router={router} />;
};

export default App;
