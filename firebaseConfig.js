import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB0X2GOVsFKY2K64JTTy9ca2Lz9fkOdWow",
    authDomain: "microproyecto-2-db9c3.firebaseapp.com",
    projectId: "microproyecto-2-db9c3",
    storageBucket: "microproyecto-2-db9c3.appspot.com",
    messagingSenderId: "771800949604",
    appId: "1:771800949604:web:4dc4d0f46b0eab544a9071",
    measurementId: "G-183GNKGEYS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore()
export const storage = getStorage(app);


