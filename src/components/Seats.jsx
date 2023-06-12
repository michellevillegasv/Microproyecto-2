import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {useParams } from 'react-router-dom';
import styles from "./Seats.module.css";

function Asientos(){
    function generarAsientos() {
        const asientos = [];
        for (let i = 1; i <= 20; i++) {
        asientos.push({
            id: i,
            disponible: true,
            reservadoPor: null
        });
        }
        return asientos;
    }
    const {movieId}=useParams();
    const moviesRef = collection(db, "movies");
    var array_asientos=[];
    async function verificarDocumento() {
        const coleccionRef = doc(db, "movies", movieId);
        const docSnapshot = await getDoc(coleccionRef);
        try{
          if (docSnapshot.exists()) {
            const data= docSnapshot.data();
            array_asientos=data.asientos;
          } else {
            addDoc(moviesRef, {
                id: movieId,
                asientos: generarAsientos()
            });
            array_asientos=generarAsientos();
          }
        } catch (error) {
          console.error("Error al obtener el documento:", error);
        }
      }
      
    verificarDocumento();

    return(
        <div className={styles.asientos}>
            {array_asientos.map((movieId,index,asientos)=>(
                <div
                key={index}
                className={`asiento ${asientos.disponible ? "disponible" : "no-disponible"}`}
                onClick={() => asientos.disponible}>
                {asientos.nombre}
              </div>
            ))}
      </div>
    );
}

export default Asientos
