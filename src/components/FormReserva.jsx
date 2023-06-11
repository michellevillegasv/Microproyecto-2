import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";


function ReservationForm() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [id, setID] = useState("");
  const [email,setEmail] =useState("");
  const [tickets,setTickets]=useState(1);
  const [seat, setSeat]=useState(1);
  const minPrice = 1000;
  const maxPrice = 5000;
  const priceRange = maxPrice - minPrice;
  const randomPrice = Math.random();
  const finalPrice = Math.floor(randomPrice * priceRange) + minPrice;


  const handleSubmit = (event) => {
    event.preventDefault();

    const user = auth.currentUser;

   
    
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
        seat,
        price:finalPrice
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
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Apellido:
        <input type="lastName" value={lastname} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <label>
        Cédula:
        <input type="id" value={id} onChange={(e) => setID(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Cantidad de boletos:
        <input type="number" id="tickets" value={tickets} min={1} max={5} step={1} onChange={event => setTickets(event.target.value)} />
      </label>
      <label>
        Precio: {finalPrice}
      </label>
      <button type="submit">Reservar</button>
    </form>
  );
}

export default ReservationForm;