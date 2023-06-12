import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function loadSeats(movieId) {
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
