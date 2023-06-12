import { defer } from "react-router-dom";
import {
  fetchMovies,
  fetchNowPlayingMovies,
  fetchSearchMovies,
  fetchUpcomingMovies,
  getImageSource,
} from "../utils/movies";

async function loadMovies(query) {
  const nowPlayingList = await fetchNowPlayingMovies();
  const upcomingList = await fetchUpcomingMovies();
  const resultsList = await fetchSearchMovies(query);

  const nowPlaying = await fetchMovies(
    nowPlayingList?.results.map((movie) => movie.id) || []
  );
  const upcoming = await fetchMovies(
    upcomingList?.results.map((movie) => movie.id) || []
  );
  const results = await fetchMovies(
    resultsList?.results.map((movie) => movie.id) || []
  );

  return {
    nowPlaying: nowPlaying.map(mapToProps),
    upcoming: upcoming.map(mapToProps),
    results: results.map(mapToProps),
  };
}

function mapToProps(data) {
  return {
    id: data.id,
    banner: getImageSource(data.backdrop_path),
    poster: getImageSource(data.poster_path),
    title: data.title,
    overview: data.overview,
    genres: data.genres.map((genre) => genre.name),
    languages: data.spoken_languages.map((language) => language.name),
    releaseDate: new Date(data.release_date),
  };
}

export default async function homeLoader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  return defer({
    movies: loadMovies(query),
  });
}
