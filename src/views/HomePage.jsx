import { Suspense } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { movies } = useLoaderData();
  const navigate = useNavigate();

  const carrousel = [
    "https://www.unimet.edu.ve/wp-content/uploads/2021/03/MODULO-DE-AULAS-ahora-1030x687.jpg",
    "https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa-52.jpg",
    "https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa.jpg",
    "https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa-30.jpg",
    "https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa-50.jpg",
  ];

  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    navigate(`/?q=${data.get("search")}`);
  };

  return (
    <>
      <Hero images={carrousel} />
      <SearchBar
        type="search"
        name="search"
        placeholder="Buscar películas por nombre"
        onSubmit={handleSearch}
      />
      <Suspense
        fallback={
          <div style={{ padding: "32px" }}>
            <Spinner />
          </div>
        }
      >
        <Await resolve={movies}>
          {({ results, nowPlaying, upcoming }) =>
            results.length > 0 ? (
              <section className={styles.movies}>
                <h2>Resultados de búsqueda</h2>
                <div>
                  {results?.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      status="available"
                    />
                  ))}
                </div>
              </section>
            ) : (
              <>
                <section className={styles.movies}>
                  <h2>Cartelera</h2>
                  <div>
                    {nowPlaying?.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        status="available"
                      />
                    ))}
                  </div>
                </section>
                <section className={styles.movies}>
                  <h2>Próximos estrenos</h2>
                  <div>
                    {upcoming?.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        status="upcoming"
                      />
                    ))}
                  </div>
                </section>
              </>
            )
          }
        </Await>
      </Suspense>
    </>
  );
}
