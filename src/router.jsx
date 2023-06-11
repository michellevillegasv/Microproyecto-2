import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import homePageloader from "./loaders/homePageLoader";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import Reservar from "./views/Reserva";
import SignUp from "./views/SignUpPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} loader={homePageloader} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/peliculas/:movieId/reservar" element={<Reservar />} />
    </Route>
  )
);

export default router;
