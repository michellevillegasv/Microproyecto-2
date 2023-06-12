import { defer } from "react-router-dom";
import { fetchMovieDetails, getImageSource } from "../utils/movies";

async function loadMovie(movieId) {
  const data = await fetchMovieDetails(movieId);
  console.log(data);
  return {
    banner: getImageSource(data.backdrop_path),
    poster: getImageSource(data.poster_path),
    title: data.title,
    overview: data.overview,
    genres: data.genres.map((genre) => genre.name),
    languages: data.spoken_languages.map((language) => language.name),
  };
}

export default async function movieLoader({ params }) {
  const { movieId } = params;
  return defer({ movie: loadMovie(movieId) });
}
