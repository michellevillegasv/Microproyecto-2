import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import movieListLoader from "./loaders/movieListLoader";
import movieLoader from "./loaders/movieLoader";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import MoviePage from "./views/MoviePage";
import Reservar from "./views/Reserva";
import SignUpGoogle from "./views/SignUpGoogle";
import SignUp from "./views/SignUpPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<HomePage />} loader={movieListLoader} />
      <Route
        path="/peliculas/:movieId"
        element={<MoviePage />}
        loader={movieLoader}
      />
      <Route
        path="/peliculas/:movieId/reservar"
        element={<Reservar />}
        loader={movieLoader}
      />
      <Route path="/peliculas/:movieId/reservar" element={<Reservar />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-up-google" element={<SignUpGoogle />} />
    </Route>
  )
);

export default router;
