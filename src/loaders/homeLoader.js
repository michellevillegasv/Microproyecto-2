import { defer } from "react-router-dom";
import {
  fetchMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  getImageSource,
} from "../utils/movies";

async function loadMovies() {
  const nowPlayingList = await fetchNowPlayingMovies();
  const upcomingList = await fetchUpcomingMovies();

  const nowPlaying = await fetchMovies(
    nowPlayingList?.results.map((movie) => movie.id) || []
  );
  const upcoming = await fetchMovies(
    upcomingList?.results.map((movie) => movie.id) || []
  );

  return {
    nowPlaying: nowPlaying.map((data) => ({
      id: data.id,
      banner: getImageSource(data.backdrop_path),
      poster: getImageSource(data.poster_path),
      title: data.title,
      overview: data.overview,
      genres: data.genres.map((genre) => genre.name),
      languages: data.spoken_languages.map((language) => language.name),
      releaseDate: new Date(data.release_date),
    })),
    upcoming: upcoming.map((data) => ({
      id: data.id,
      banner: getImageSource(data.backdrop_path),
      poster: getImageSource(data.poster_path),
      title: data.title,
      overview: data.overview,
      genres: data.genres.map((genre) => genre.name),
      languages: data.spoken_languages.map((language) => language.name),
      releaseDate: new Date(data.release_date),
    })),
  };
}

export default async function homeLoader() {
  return defer({ movies: loadMovies() });
}
