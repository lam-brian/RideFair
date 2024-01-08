import { useContext } from "react";
import { Web5Context } from "./store/web5-context";
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
  const web5Ctx = useContext(Web5Context);
  let usedRoutes = routes;

  // if (web5Ctx.user) {
  //   usedRoutes = authRoutes;
  // } else {
  //   usedRoutes = routes;
  // }

  const router = createBrowserRouter(usedRoutes);

  return <RouterProvider router={router} />;
};

export default App;
