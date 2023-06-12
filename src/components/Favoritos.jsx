import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';


function AddFavorites(){

    const {movieId}=useParams();
    const userDocRef=doc(collection(db,"users",auth.currentUser.uid));
    const userDocSnapshot = getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const favorites = userDocSnapshot.data().favorites;
      const updatedFavorites = favorites.map((favorite) => ({ ...favorite, id: movieId }));
      updateDoc(userDocRef, { favorites: updatedFavorites });
      console.log(userDocSnapshot.data())
    } else{
        console.log("No existe este doc")
    }
}

export default AddFavorites;






