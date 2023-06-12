import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import styles from "./MoviePage.module.css";
import { arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useParams } from 'react-router-dom';



export default function MoviePage() {
  const { movie } = useLoaderData();
  const {movieId}=useParams();
  const user = auth.currentUser;
  
async function addFavorites(){
  if(user){
    const snapshot = await getDocs(collection(db, 'users'));
      snapshot.forEach((docu) => {
        if((docu.data().uid)==(user.uid)){
          const userDocRef=doc(db, "users", docu.id);
          updateDoc(userDocRef, {
            favorites: arrayUnion(movieId),
          });
          alert("Añadido a Favoritos")
          console.log("Añadida")
        }
      });
    } else{
      alert("No hay usuario")
      console.error('Error al obtener usuario');
    }
  }

  
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Await resolve={movie}>
          {({ banner, poster, title, overview, genres, languages }) => (
            <>
              <img className={styles.banner} src={banner} alt={title} />
              <div className={styles.container}>
                <img className={styles.poster} src={poster} alt={title} />
                <div className={styles.actions}>
                  <Button to="reservar">Reservar</Button>
                  <Button onClick={addFavorites} variant="text">Agregar a favoritos</Button>
                </div>
                <div className={styles.content}>
                  <h1>{title}</h1>
                  <p className={styles.overview}>{overview}</p>
                  <div className={styles.details}>
                    <div>Géneros: {genres.join(", ")}</div>
                    <div>Idiomas: {languages.join(", ")}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
      <img className={styles.banner} />
    </>
  );
}
