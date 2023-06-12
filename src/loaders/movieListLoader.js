import { defer } from "react-router-dom";
import {
  fetchMovieGenres,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  getImageSource,
} from "../utils/movies";

function mapToMovieCardProps(
  { id, title, release_date, poster_path, genre_ids, original_language },
  genres
) {
  return {
    id,
    title,
    releaseDate: new Date(release_date),
    genres: genre_ids.map(
      (genreId) => genres.find(({ id }) => id === genreId).name
    ),
    languages: [original_language],
    posterSrc: getImageSource(poster_path),
  };
}

async function loadMovies() {
  const nowPlaying = await fetchNowPlayingMovies();
  const upcoming = await fetchUpcomingMovies();
  const genres = await fetchMovieGenres();

  return {
    nowPlaying: nowPlaying?.results.map((movie) =>
      mapToMovieCardProps(movie, genres?.genres)
    ),
    upcoming: upcoming?.results.map((movie) =>
      mapToMovieCardProps(movie, genres?.genres)
    ),
  };
}

export default async function homePageloader() {
  return defer({ movies: loadMovies() });
}
