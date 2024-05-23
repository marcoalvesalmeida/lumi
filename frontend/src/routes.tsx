import {
  Route,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

import Home from '@/pages/Home';
import Dashboard from "./pages/Dashboard";
import DefaultLayout from "./layouts/default";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route
        element={<DefaultLayout />}
      >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </>
));

export {router};