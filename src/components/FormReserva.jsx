import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../views/Auth";
import Button from "./Button";
import styles from "./FormReserva.module.css";
import TextField from "./TextField";

function ReservationForm() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(1);
  const finalPrice = new Array(tickets).reduce(
    (prev) => prev + Math.floor(Math.random() * 4000) + 1000,
    0
  );

  //const [seat, setSeat]=useState(1);
  const { user } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user) {
      const reservationsRef = collection(db, "reservations");

      const userRef = collection(db, "users").doc(user.uid);

      addDoc(reservationsRef, {
        userRef,
        name,
        lastname,
        id,
        email,
        tickets,
        //seat,
        price: finalPrice,
      })
        .then(() => {
          console.log("Reserva guardada con éxito");
        })
        .catch((error) => {
          console.error("Error al guardar la reserva:", error);
        });
    } else {
      console.log("Usuario no autenticado");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Nombre"
        placeholder="Ingrese su nombre"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        name="lastName"
        label="Apellido"
        placeholder="Ingrese su apellido"
        value={lastname}
        onChange={(event) => setLastName(event.target.value)}
      />
      <TextField
        name="id"
        label="Cédula"
        placeholder="Ingrese su cédula"
        value={id}
        onChange={(event) => setID(event.target.value)}
      />
      <TextField
        name="email"
        label="Correo Electrónico"
        placeholder="Ingrese su correo"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className={styles.amount}>
        <TextField
          name="amount"
          type="number"
          label="Cantidad de Boletos"
          placeholder="Ingrese su correo"
          min={1}
          max={5}
          value={tickets}
          onChange={(event) => setTickets(event.target.value)}
        />
        <div>Precio: ${finalPrice}</div>
      </div>
      <Button type="submit">Reservar</Button>
    </form>
  );
}

export default ReservationForm;
