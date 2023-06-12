import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { Suspense, useMemo, useState } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Seats from "../components/Seats";
import Spinner from "../components/Spinner";
import TextField from "../components/TextField";
import { db } from "../firebaseConfig";
import { useAuth } from "./Auth";
import styles from "./Reserva.module.css";

function Reservar() {
  const { movie, seats: initialSeats } = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  const [seats, setSeats] = useState(initialSeats);
  const [count, setCount] = useState(0);
  const price = useMemo(
    () =>
      new Array(count)
        .fill(null)
        .reduce((prev) => prev + Math.floor(Math.random() * 4000 + 1000), 0),
    [count]
  );

  const handleSelect = (id, status) => {
    const seat = { id, status };
    if (seat.status === "available" && count < 5) {
      seat.status = "selected";
      setCount((count) => count + 1);
    } else if (seat.status === "selected") {
      seat.status = "available";
      setCount((count) => count - 1);
    }
    setSeats((seats) => [
      ...seats.filter((seat) => seat.id < id),
      seat,
      ...seats.filter((seat) => seat.id > id),
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const reservationsRef = collection(db, "reservations");
    const moviesRef = collection(db, "movies");
    const usersRef = collection(db, "movies");

    console.log(user, data.get("movie"));

    const userRef = doc(usersRef, user.uid);
    const movieRef = doc(moviesRef, data.get("movie"));

    const seatIds = seats
      .filter((seat) => seat.status === "selected")
      .map((seat) => seat.id);

    try {
      await addDoc(reservationsRef, {
        userRef,
        name: data.get("name"),
        lastName: data.get("last_name"),
        dni: data.get("dni"),
        email: data.get("email"),
        seats: seatIds,
        price: price,
      });
      const movie = (await getDoc(movieRef))?.data();
      const seats = movie.seats.map(({ id, status }) => ({
        id,
        status: seatIds.includes(id) ? "unavailable" : status,
      }));
      await updateDoc(movieRef, { seats });
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={movie}
        errorElement={<div>¡Error al cargar los datos!</div>}
      >
        {({ id, banner, title }) => (
          <>
            {banner && (
              <img className={styles.banner} src={banner} alt={title} />
            )}
            <form className={styles.container} onSubmit={handleSubmit}>
              <div className={styles.content}>
                <h1>{title}</h1>
                <div className={styles.fields}>
                  <TextField
                    name="name"
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                  />
                  <TextField
                    name="last_name"
                    label="Apellido"
                    placeholder="Ingrese su apellido"
                  />
                  <TextField
                    name="dni"
                    label="Cédula"
                    placeholder="Ingrese su cédula"
                  />
                  <TextField
                    name="email"
                    label="Correo Electrónico"
                    placeholder="Ingrese su correo"
                  />
                  <input name="movie" type="hidden" value={id} />
                </div>
              </div>
              <div className={styles.seats}>
                <Seats seats={seats} onSelect={handleSelect} />
                <div>
                  <div className={styles.count}>
                    Cantidad de Asientos: {count}
                  </div>
                  <div className={styles.total}>Total: ${price}</div>
                </div>
              </div>
              <div className={styles.actions}>
                <Button type="submit">Reservar</Button>
              </div>
            </form>
          </>
        )}
      </Await>
    </Suspense>
  );

  // ;
}
export default Reservar;
