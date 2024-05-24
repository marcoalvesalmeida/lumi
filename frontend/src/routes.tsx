import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "@/pages/Home";
import Dashboard from "./pages/Dashboard";
import DefaultLayout from "./layouts/default";
import InvoicesLibrary from "./pages/InvoicesLibrary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route element={<DefaultLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices-library" element={<InvoicesLibrary />} />
      </Route>
    </>,
  ),
);

export { router };
