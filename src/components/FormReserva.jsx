import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import styles from "./FormReserva.module.css";
import TextField from "./TextField";
import Button from "./Button";



function ReservationForm() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [id, setID] = useState("");
  const [email,setEmail] =useState("");
  const [tickets,setTickets]=useState(1);
  //const [seat, setSeat]=useState(1);
  const user = auth.currentUser;
  var finalPrice=0;

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
  
  
  for(let i=0;i<(tickets);i++){
    
    const minPrice = 1000;
    const maxPrice = 5000;
    const priceRange = maxPrice - minPrice;
    const randomPrice = Math.random();
    const priceTicket=Math.floor(randomPrice * priceRange) + minPrice;
    finalPrice=finalPrice+priceTicket;
  }
  
 
  return (
    <div className={styles.form}>
      <h1>Reservar</h1>
      <TextField
        name="name"
        label="Nombre"
        placeholder="Ingrese su nombre"
        value={name}
        onChange={(event)=>setName(event.target.value)}
      />
      <TextField
        name="lastName"
        label="Apellido"
        placeholder="Ingrese su apellido"
        value={lastname}
        onChange={(event)=>setLastName(event.target.value)}
      />
      <TextField
        name="id"
        label="Cédula"
        placeholder="Ingrese su cédula"
        value={id}
        onChange={(event)=>setID(event.target.value)}
      />
      <TextField
        name="email"
        label="Correo Electrónico"
        placeholder="Ingrese su correo"
        value={email}
        onChange={(event)=>setEmail(event.target.value)}
      />
      <h3>Cantidad de Boletos</h3>
      <input type="number" className={styles.tickets} value={tickets} min={1} max={5} step={1} onChange={event => setTickets(event.target.value)} />
      <h3>Precio: {finalPrice}</h3>
      <Button onClick={handleSubmit}>Reservar</Button>
    </div>
  );
}

export default ReservationForm;