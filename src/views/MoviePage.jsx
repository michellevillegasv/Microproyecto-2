import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import styles from "./MoviePage.module.css";

export default function MoviePage() {
  const { movie } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={movie}>
        {({ banner, poster, title, overview, genres, languages }) => (
          <>
            {banner && (
              <img className={styles.banner} src={banner} alt={title} />
            )}
            <div className={styles.container}>
              <img className={styles.poster} src={poster} alt={title} />
              <div className={styles.actions}>
                <Button to="reservar">Reservar</Button>
                <Button variant="text">Agregar a favoritos</Button>
              </div>
              <div className={styles.content}>
                <h1>{title}</h1>
                {overview && <p className={styles.overview}>{overview}</p>}
                <div className={styles.details}>
                  {genres && <div>Géneros: {genres.join(", ")}</div>}
                  {languages && <div>Idiomas: {languages.join(", ")}</div>}
                </div>
              </div>
            </div>
          </>
        )}
      </Await>
    </Suspense>
  );
}
