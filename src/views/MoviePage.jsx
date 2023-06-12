import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import styles from "./MoviePage.module.css";
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useParams } from 'react-router-dom';


export default function MoviePage() {
  const { movie } = useLoaderData();
  const {movieId}=useParams();
  const user = auth.currentUser;
  async function handleAddtoFavorite(){
    try{
      const userDocRef = doc(db,'users',user.uid);
      console.log(user.uid)
      await updateDoc(userDocRef, {
        favorites: arrayUnion(movieId),
      });
    } catch(error){
      console.log(error)
    }
    
   // const userDocSnapshot = getDoc(userDocRef);

    //if (userDocSnapshot.exists()) {
      //const favorites = userDocSnapshot.data().favorites;
      //const updatedFavorites = favorites.map((favorite) => ({ ...favorite, id: movieId }));
      //updateDoc(userDocRef, { favorites: updatedFavorites });
      //console.log(userDocSnapshot.data())
    //} else{
    //  console.log("No existe este doc")
    //}
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
                  <Button onClick={handleAddtoFavorite} variant="text">Agregar a favoritos</Button>
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
