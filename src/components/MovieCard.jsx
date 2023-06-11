import Button from "./Button";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import styles from "./MovieCard.module.css";

/**
 * @typedef {{
 *   movie: {
 *     id: string;
 *     title: string;
 *     genres: string[];
 *     languages: string[];
 *     releaseDate: Date;
 *     posterSrc: string;
 *   };
 *   status?: "available" | "unavailable" | "upcoming";
 *   bookButtonProps?: import("./Button").ButtonProps;
 *   detailsButtonProps?: import("./Button").ButtonProps;
 * }} MovieCardProps
 */

/** @param {MovieCardProps} props */
export default function MovieCard({
  movie,
  status = "available",
  bookButtonProps = {},
  detailsButtonProps = {},
}) {
  return (
    <div className={styles.card} tabIndex={0}>
      <img src={movie.posterSrc} alt={movie.title} />
      <div className={styles.content}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.details}>
          <div>Género: {movie.genres.join(", ")}</div>
          <div>Idiomas: {movie.languages.join(", ")}</div>
          <div>Fecha de estreno: {movie.releaseDate.toLocaleDateString()}</div>
        </div>
        <div className={styles.actions}>
          {status === "available" ? (
            <Button
              {...bookButtonProps}
              variant="filled"
              to={`/peliculas/${movie.id}/reservar`}
            >
              Reservar
            </Button>
          ) : status === "unavailable" ? (
            <div className={styles.status}>AGOTADO</div>
          ) : status === "upcoming" ? (
            <div className={styles.status}>PRÓXIMAMENTE</div>
          ) : null}
          <Button
            {...detailsButtonProps}
            variant="text"
            to={`/peliculas/${movie.id}`}
          >
            Detalles <ArrowRightIcon style={{ fontSize: 16 }} />
          </Button>
        </div>
      </div>
    </div>
  );
}
