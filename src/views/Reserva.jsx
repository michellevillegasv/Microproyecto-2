import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Suspense, useMemo, useState } from "react";
import { Await, Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
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
  const { movieId } = useParams();
  const navigate=useNavigate();

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

    const movieRef = doc(moviesRef, data.get("movie"));

    const seatIds = seats
      .filter((seat) => seat.status === "selected")
      .map((seat) => seat.id);

    try {
      await addDoc(reservationsRef, {
        uid: auth.currentUser.uid,
        movieReference: movieId,
        name: data.get("name"),
        lastName: data.get("last_name"),
        dni: data.get("dni"),
        email: data.get("email"),
        seats: seatIds,
        price: price,
      });
      const seats = initialSeats.map(({ id, status }) => ({
        id,
        status: seatIds.includes(id) ? "unavailable" : status,
      }));
      await updateDoc(movieRef, { seats });

      navigate("/");
    } catch(error) {
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
            <Form className={styles.container} onSubmit={handleSubmit}>
              <div className={styles.content}>
                <h1>{title}</h1>
                <div className={styles.fields}>
                  <TextField
                    id="name"
                    name="name"
                    label="Nombre"
                    placeholder="Ingrese su nombre"
                    required
                  />
                  <TextField
                    id="last_name"
                    name="last_name"
                    label="Apellido"
                    placeholder="Ingrese su apellido"
                    required
                  />
                  <TextField
                    id="dni"
                    name="dni"
                    label="Cédula"
                    placeholder="Ingrese su cédula"
                    pattern="\d{7,8}"
                    required
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="Correo Electrónico"
                    placeholder="Ingrese su correo"
                    required
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
            </Form>
          </>
        )}
      </Await>
    </Suspense>
  );
}

export default Reservar;