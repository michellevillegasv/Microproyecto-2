import { defer, redirect } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { loadMovie } from "../utils/movies";
import { loadSeats } from "../utils/reservations";

export default async function reservationLoader({ params }) {
  const { movieId } = params;

  if (!auth.currentUser) {
    return redirect("/login");
  }

  const movie = await loadMovie(movieId);
  const seats = await loadSeats(movieId);

  if (
    movie.releaseDate > new Date() ||
    seats.filter((seat) => seat.status === "unavailable").length === 20
  ) {
    return redirect(`/peliculas/${movieId}/`);
  }

  return defer({
    movie,
    seats,
  });
}
