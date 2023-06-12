function fetchApi(endpoint, params) {
  const url = new URL(endpoint);
  url.searchParams.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  return fetch(url.href);
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

export async function fetchMovieGenres() {
  const res = await fetchApi("https://api.themoviedb.org/3/genre/movie/list", {
    language: "es-VE",
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export async function fetchMovieDetails(movieId) {
  const res = await fetchApi(`https://api.themoviedb.org/3/movie/${movieId}`, {
    language: "es-VE",
    region: "VE",
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

export function getImageSource(path) {
  return `https://image.tmdb.org/t/p/original${path}`;
}
