import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Suspense } from "react";
import { Await, useLoaderData, useParams } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { auth, db } from "../firebaseConfig";
import styles from "./MoviePage.module.css";

export default function MoviePage() {
  const { movie, seats } = useLoaderData();
  const { movieId } = useParams();
  const user = auth.currentUser;

  async function addFavorites() {
    if (user) {
      const snapshot = await getDocs(collection(db, "users"));
      snapshot.forEach((docu) => {
        if (docu.data().uid == user.uid) {
          const userDocRef = doc(db, "users", docu.id);
          updateDoc(userDocRef, {
            favorites: arrayUnion(movieId),
          });
          alert("Añadido a Favoritos");
          console.log("Añadida");
        }
      });
    } else {
      alert("No hay usuario");
      console.error("Error al obtener usuario");
    }
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={movie}>
        {({
          banner,
          poster,
          title,
          overview,
          genres,
          languages,
          releaseDate,
        }) => (
          <>
            {banner && (
              <img className={styles.banner} src={banner} alt={title} />
            )}
            <div className={styles.container}>
              <img className={styles.poster} src={poster} alt={title} />
              <div className={styles.actions}>
                {seats.filter((seat) => seat.status === "unavailable")
                  .length === 20 ? (
                  <div className={styles.status}>AGOTADO</div>
                ) : releaseDate > new Date() ? (
                  <div className={styles.status}>PRÓXIMAMENTE</div>
                ) : (
                  <Button to="reservar">Reservar</Button>
                )}
                <Button variant="text" onClick={addFavorites}>
                  Agregar a favoritos
                </Button>
              </div>
              <div className={styles.content}>
                <h1>{title}</h1>
                {overview && <p className={styles.overview}>{overview}</p>}
                <div className={styles.details}>
                  {genres && <div>Géneros: {genres.join(", ")}</div>}
                  {languages && <div>Idiomas: {languages.join(", ")}</div>}
                  <div>
                    Fecha de estreno: {releaseDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Await>
    </Suspense>
  );
}
