import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Onboarding from "./pages/Onboarding/Onboading";
import SignUp from "./pages/Signup/Signup";

const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<h1>Hello world</h1>} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/signup" element={<SignUp />} />
  </Route>
);

const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
