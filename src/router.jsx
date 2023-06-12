import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import movieListLoader from "./loaders/homeLoader";
import movieLoader from "./loaders/movieLoader";
import ShowDashboard from "./views/DashboardUser";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import MoviePage from "./views/MoviePage";
import Reservar from "./views/Reserva";

import profileLoader from "./loaders/profileLoader";
import reservationLoader from "./loaders/reservationLoader";
import SignUp from "./views/SignUpPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<div>Algo falló 👀</div>}>
      <Route path="/" element={<HomePage />} loader={movieListLoader} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={<ShowDashboard />}
        loader={profileLoader}
      />
      <Route
        path="/peliculas/:movieId"
        element={<MoviePage />}
        loader={movieLoader}
      />
      <Route
        path="/peliculas/:movieId/reservar"
        element={<Reservar />}
        loader={reservationLoader}
      />
    </Route>
  )
);

export default router;
