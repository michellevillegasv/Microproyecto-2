import { useState, useEffect } from 'react';
import { getDoc, getDocs, collection, doc } from 'firebase/firestore';
import styles from './DashboardUser.module.css';
import { fetchMovie, fetchMovies } from '../utils/movies';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from "react-router-dom";



export default function ShowDashboard() {
  const user = auth.currentUser;
  const [reservations, setReservations]=useState();
  const [favorites, setFavorites] = useState([]);
  const navigate=useNavigate();
  

  useEffect(() => {
    async function getFavorites() {
      if (user) {
        const snapshot = await getDocs(collection(db, "users"));

        for (const docu of snapshot.docs) {
          if (docu.data().uid == user.uid) {
            const userDocRef = doc(db, "users", docu.id);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();
            const userFavorites = userData.favorites;
            const infoFavorites = await fetchMovies(userFavorites);
            setFavorites(infoFavorites);
          }
        }
      } else {
        alert("No hay usuario autenticado");
        navigate("/")
      }
    }
    async function getReservations(){
      if (user) {
        const snapshot = await getDocs(collection(db, "reservations"));
        for (const docu of snapshot.docs) {
          if (docu.data().uid == user.uid) {
            const userReserva = docu.data().movieReference;
            const infoReserva = await fetchMovie(userReserva);
            setReservations(infoReserva);
          }
        }
      } else {
        alert("No hay usuario autenticado");
        navigate("/")
      }
    }

    getFavorites();
    getReservations();
  }, [user,navigate]);

  return (
    
    <>
    <h1>PERFIL DEL USUARIO</h1>
    <div className={styles.line}></div>
    <h2>FAVORITOS</h2>
      {favorites.map((movie) => (
        <div key={movie.id} className={styles.container}>
          <img className={styles.poster} src={movie.poster} alt={movie.title} />
          <div className={styles.content}>
            <h1>{movie.title}</h1>
          </div>
        </div>
      ))}
    <div className={styles.line}></div>
    <h2>RESERVAS</h2>
      {reservations.map((movie) => (
        <div key={movie.id} className={styles.container}>
          <img className={styles.poster} src={movie.poster} alt={movie.title} />
          <div className={styles.content}>
            <h1>{movie.title}</h1>
          </div>
        </div>
      ))}
      </>
  )
}