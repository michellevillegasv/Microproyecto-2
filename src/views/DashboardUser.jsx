import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import styles from "./DashboardUser.module.css";

export default function ShowDashboard() {
  const { reservations } = useLoaderData();

  // const user = auth.currentUser;
  // const [reservations, setReservations] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   async function getFavorites() {
  //     if (user) {
  //       const snapshot = await getDocs(collection(db, "users"));

  //       for (const docu of snapshot.docs) {
  //         if (docu.data().uid == user.uid) {
  //           const userDocRef = doc(db, "users", docu.id);
  //           const userDoc = await getDoc(userDocRef);
  //           const userData = userDoc.data();
  //           const userFavorites = userData.favorites;
  //           const infoFavorites = await fetchMovies(userFavorites);
  //           setFavorites(infoFavorites);
  //         }
  //       }
  //     } else {
  //       alert("No hay usuario autenticado");
  //       navigate("/");
  //     }
  //   }
  //   async function getReservations() {
  //     if (user) {
  //       const snapshot = await getDocs(collection(db, "reservations"));
  //       for (const docu of snapshot.docs) {
  //         if (docu.data().uid == user.uid) {
  //           const userReserva = docu.data().movieReference;
  //           const infoReserva = await fetchMovies(userReserva);
  //           setReservations(infoReserva);
  //         }
  //       }
  //     } else {
  //       alert("No hay usuario autenticado");
  //       navigate("/");
  //     }
  //   }

  //   getFavorites();
  //   getReservations();
  // }, [user, navigate]);

  return (
    <>
      <section className={styles.movies}>
        <h2>Reservas</h2>
        <div>
          <Suspense
            fallback={
              <div style={{ padding: "32px" }}>
                <Spinner />
              </div>
            }
          >
            <Await resolve={reservations}>
              {reservations?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Await>
          </Suspense>
        </div>
      </section>
      <section className={styles.movies}>
        <h2>Favoritos</h2>
        <div>
          <Suspense
            fallback={
              <div style={{ padding: "32px" }}>
                <Spinner />
              </div>
            }
          >
            <Await resolve={reservations}>
              {reservations?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Await>
          </Suspense>
        </div>
      </section>
    </>
  );
}
