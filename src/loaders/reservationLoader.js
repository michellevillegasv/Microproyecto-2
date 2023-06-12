import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { defer } from "react-router-dom";
import { db } from "../firebaseConfig";
import { fetchMovie, getImageSource } from "../utils/movies";

async function loadSeats(movieId) {
  const moviesRef = collection(db, "movies");

  const movieRef = doc(moviesRef, movieId);
  const movieDoc = await getDoc(movieRef);
  if (movieDoc.exists()) {
    return movieDoc.data()?.seats || [];
  } else {
    const seats = new Array(20).fill(null).map((_, index) => ({
      id: index,
      status: "available",
    }));
    const data = {
      id: movieId,
      seats,
    };
    setDoc(movieRef, data);
    return seats;
  }
}

async function loadMovie(movieId) {
  const data = await fetchMovie(movieId);
  return {
    id: data.id,
    banner: getImageSource(data.backdrop_path),
    poster: getImageSource(data.poster_path),
    title: data.title,
    overview: data.overview,
    genres: data.genres.map((genre) => genre.name),
    languages: data.spoken_languages.map((language) => language.name),
  };
}

export default async function reservationLoader({ params }) {
  const { movieId } = params;
  return defer({ movie: loadMovie(movieId), seats: await loadSeats(movieId) });
}
