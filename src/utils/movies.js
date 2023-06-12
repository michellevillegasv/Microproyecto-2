function fetchApi(endpoint, params) {
  const url = new URL(endpoint);
  url.searchParams.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  return fetch(url.href);
}

export async function fetchSearchMovies(query) {
  if (!query) return null;
  const res = await fetchApi("https://api.themoviedb.org/3/search/movie", {
    query,
    language: "es-VE",
    region: "VE",
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export async function fetchNowPlayingMovies() {
  const res = await fetchApi("https://api.themoviedb.org/3/movie/now_playing", {
    language: "es-VE",
    region: "VE",
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export async function fetchUpcomingMovies() {
  const res = await fetchApi("https://api.themoviedb.org/3/movie/upcoming", {
    language: "es-VE",
    region: "VE",
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export async function fetchMovie(movieId) {
  const res = await fetchApi(`https://api.themoviedb.org/3/movie/${movieId}`, {
    language: "es-VE",
    region: "VE",
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export async function fetchMovies(movieIds) {
  return await Promise.all(
    movieIds.map(async (movieId) => await fetchMovie(movieId))
  );
}

export function getImageSource(path) {
  return path && `https://image.tmdb.org/t/p/original${path}`;
}

export async function loadMovie(movieId) {
  const data = await fetchMovie(movieId);
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
