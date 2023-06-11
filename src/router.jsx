import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import homePageloader from "./loaders/homePageLoader";
import HomePage from "./views/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} loader={homePageloader} />
    </Route>
  )
);

export default router;
