import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import ReservasFormulario from "../components/FormReserva";
import Seats from "../components/Seats";
import Spinner from "../components/Spinner";
import styles from "./Reserva.module.css";

function Reservar() {
  const { movie, seats } = useLoaderData();

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={movie}
        errorElement={<div>¡Error al cargar los datos!</div>}
      >
        {({ banner, title }) => (
          <>
            {banner && (
              <img className={styles.banner} src={banner} alt={title} />
            )}
            <div className={styles.container}>
              <div className={styles.seats}>
                <Seats seats={seats} />
              </div>
              <div className={styles.content}>
                <h1>{title}</h1>
                <ReservasFormulario />
              </div>
            </div>
          </>
        )}
      </Await>
    </Suspense>
  );
}
export default Reservar;
