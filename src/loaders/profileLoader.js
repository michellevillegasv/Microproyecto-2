import { collection, getDocs, query, where } from "firebase/firestore";
import { defer, redirect } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { fetchMovies, getImageSource } from "../utils/movies";

async function loadReservations(userId) {
  const reservationsRef = collection(db, "reservations");
  const userReservations = await getDocs(
    query(reservationsRef, where("uid", "==", userId))
  );

  const movieIds = [];
  userReservations.forEach((reservation) =>
    movieIds.push(reservation.data().movieReference)
  );

  const reservations = await fetchMovies(movieIds);

  return reservations.map((data) => ({
    id: data.id,
    banner: getImageSource(data.backdrop_path),
    poster: getImageSource(data.poster_path),
    title: data.title,
    overview: data.overview,
    genres: data.genres.map((genre) => genre.name),
    languages: data.spoken_languages.map((language) => language.name),
    releaseDate: new Date(data.release_date),
  }));
}

export default async function profileLoader() {
  if (!auth.currentUser) {
    return redirect("/login");
  }

  const reservations = await loadReservations(auth.currentUser.uid);
  console.log(reservations);

  // const favorites = await loadFavorites(movieId);

  return defer({
    reservations,
    // favorites,
  });
}
