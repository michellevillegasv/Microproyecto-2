import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import styles from "./DashboardUser.module.css";

export default function ShowDashboard() {
  const { reservations, favorites } = useLoaderData();

  return (
    <>
      <section className={styles.movies}>
        <h2>Reservas</h2>
        <div>
          <Suspense
            fallback={
              <div style={{ padding: "32px" }}>
                <Spinner />
              </div>
            }
          >
            <Await resolve={reservations}>
              {(reservations) =>
                reservations?.map((movie, key) => (
                  <MovieCard key={key} movie={movie} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </section>
      <section className={styles.movies}>
        <h2>Favoritos</h2>
        <div>
          <Suspense
            fallback={
              <div style={{ padding: "32px" }}>
                <Spinner />
              </div>
            }
          >
            <Await resolve={favorites}>
              {(favorites) =>
                favorites?.map((movie, key) => (
                  <MovieCard key={key} movie={movie} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </section>
    </>
  );
}
