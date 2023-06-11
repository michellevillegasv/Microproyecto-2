import { defer } from "react-router-dom";

async function fetchNowPlaying() {
  const url = new URL("https://api.themoviedb.org/3/movie/now_playing");
  url.searchParams.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
  url.searchParams.append("language", "es-VE");
  url.searchParams.append("region", "VE");
  const res = await fetch(url.href);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

async function fetchUpcoming() {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming");
  url.searchParams.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
  url.searchParams.append("language", "es-VE");
  url.searchParams.append("region", "VE");
  const res = await fetch(url.href);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

async function fetchGenres() {
  const url = new URL("https://api.themoviedb.org/3/genre/movie/list");
  url.searchParams.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
  url.searchParams.append("language", "es-VE");
  const res = await fetch(url.href);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

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
    posterSrc: `https://image.tmdb.org/t/p/original${poster_path}`,
  };
}

async function loadMovies() {
  const nowPlaying = await fetchNowPlaying();
  const upcoming = await fetchUpcoming();
  const genres = await fetchGenres();

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
