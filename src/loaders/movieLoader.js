import { collection, getDocs, query, where } from "firebase/firestore";
import { defer } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { loadMovie } from "../utils/movies";
import { loadSeats } from "../utils/reservations";

async function loadIsFavorite(movieId, userId) {
  if (!userId) return false;

  const usersRef = collection(db, "users");

  const user = await getDocs(query(usersRef, where("uid", "==", userId)));

  return user.docs[0].data()?.favorites.includes(movieId) || false;
}

export default async function movieLoader({ params }) {
  const { movieId } = params;

  return defer({
    movie: loadMovie(movieId),
    seats: await loadSeats(movieId),
    isFavorite: await loadIsFavorite(movieId, auth.currentUser?.uid),
  });
}
