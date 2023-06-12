import { defer } from "react-router-dom";
import { loadMovie } from "../utils/movies";
import { loadSeats } from "../utils/reservations";

export default async function movieLoader({ params }) {
  const { movieId } = params;

  return defer({
    movie: loadMovie(movieId),
    seats: await loadSeats(movieId),
  });
}
