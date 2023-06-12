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
import SignUpGoogle from "./views/SignUpGoogle";

import profileLoader from "./loaders/profileLoader";
import reservationLoader from "./loaders/reservationLoader";
import SignUp from "./views/SignUpPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} loader={movieListLoader} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-up-google" element={<SignUpGoogle />} />
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
