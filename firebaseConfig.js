import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB0X2GOVsFKY2K64JTTy9ca2Lz9fkOdWow",
    authDomain: "microproyecto-2-db9c3.firebaseapp.com",
    projectId: "microproyecto-2-db9c3",
    storageBucket: "microproyecto-2-db9c3.appspot.com",
    messagingSenderId: "771800949604",
    appId: "1:771800949604:web:4dc4d0f46b0eab544a9071",
    measurementId: "G-183GNKGEYS"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage(app);

export const auth= getAuth(app);
export const provider= new GoogleAuthProvider();



