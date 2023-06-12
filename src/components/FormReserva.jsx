import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { useState, useEffect} from "react";
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
  const [userRef, setUserrRef]=useState("")

  useEffect(() => {
    async function getFavorites() {
      if (user) {
        const snapshot = await getDocs(collection(db, "users"));

        for (const docu of snapshot.docs) {
          if (docu.data().uid == user.uid) {
            const userDocRef = doc(db, "users", docu.id);
            setUserrRef(userDocRef);
          }
        }
      } else {
        alert("No hay usuario autenticado");
      }
    }

    getFavorites();
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !lastname || !id || !email || !tickets) {
      alert("Por favor complete todos los campos")
      console.log("Por favor complete todos los campos");
      return;
    }
  
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Ingrese un correo válido")
      console.log("Por favor ingrese un correo electrónico válido");
      return;
    }


    if (tickets < 1 || tickets > 5) {
      alert("Cantidad de boletos inválida")
      console.log("Por favor ingrese una cantidad de boletos válida (entre 1 y 5)");
      return;
    }


    if (user) {
      const reservationsRef = collection(db, "reservations");

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
        <div>Precio: ${finalPrice} 
        </div>
      </div>
      <Button type="submit" >Reservar</Button>
    </form>
  );
}

export default ReservationForm;
