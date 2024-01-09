import { useContext } from "react";
import { Web5Context } from "./store/web5-context";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Onboarding from "./pages/Onboarding/Onboading";
import SignUp from "./pages/SignUp/SignUp";
import Activity from "./pages/Activity/Activity";
import Profile from "./pages/Profile/Profile";
import Wrapper from "./components/Wrapper/Wrapper";

const routes = createRoutesFromElements(
  <Route>
    <Route
      path="/"
      element={
        <Wrapper>
          <Navigate to="/onboarding" />
        </Wrapper>
      }
    />
    <Route
      path="/onboarding"
      element={
        <Wrapper>
          <Onboarding />
        </Wrapper>
      }
    />
    <Route
      path="/signup"
      element={
        <Wrapper>
          <SignUp />
        </Wrapper>
      }
    />
    <Route
      path="/*"
      element={
        <Wrapper>
          <Navigate to="/" />
        </Wrapper>
      }
    />
  </Route>
);

const authRoutes = createRoutesFromElements(
  <Route>
    <Route
      path="/"
      element={
        <Wrapper>
          <Home />
        </Wrapper>
      }
    />
    <Route
      path="/activity"
      element={
        <Wrapper>
          <Activity />
        </Wrapper>
      }
    />
    <Route
      path="/profile"
      element={
        <Wrapper>
          <Profile />
        </Wrapper>
      }
    />
    <Route
      path="/*"
      element={
        <Wrapper>
          <Navigate to="/" />
        </Wrapper>
      }
    />
  </Route>
);

const App = () => {
  const web5Ctx = useContext(Web5Context);
  let usedRoutes;

  if (web5Ctx.user) {
    usedRoutes = authRoutes;
  } else {
    usedRoutes = routes;
  }

  const router = createBrowserRouter(usedRoutes);

  return <RouterProvider router={router} />;
};

export default App;
