import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
 

function Registro() {

   
    const [name, setName] = useState("");
    const [LastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");




    function handleRegistroSubmit(event) {

    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
  
        console.log("Usuario registrado correctamente:", userCredential.user.uid);

        const newUser = {
        name: name,
        LastName: LastName,
        username: username,
        email: email,
        };
        addDoc(collection(db, "users"), newUser)
        .then(() => {
            console.log("Datos de registro guardados en Firestore");
        })
        .catch((error) => {
            console.error("Error al guardar datos de registro en Firestore:", error);
        });
    })
    .catch((error) => {
        console.error("Error al registrar usuario:", error.message);
    });
    }
    function handleRegistroGoogle(event) {
        event.preventDefault();
    
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            console.log("Usuario inició sesión correctamente:", user.uid);
    
            const userGoogle = {
              name : name,
              LastName: LastName,
              username: username,
              email: user.email,
            };
            addDoc(collection(db, "usuarios"), userGoogle)
              .then(() => {
                console.log("Datos de registro guardados en Firestore");
              })
              .catch((error) => {
                console.error("Error al guardar datos de registro en Firestore:", error);
              });
          })
          .catch((error) => {
            console.error("Error al iniciar sesión con cuenta de Google:", error.message);
          });
    }
    return (
    <div>
    <h2>Sign Up</h2>
    <form onSubmit={handleRegistroSubmit}>
        <label htmlFor="name">Ingresa su nombre:</label>
        <input
        type="text"
        id="name"
        placeholder="Pedro"
        value={name}
        onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="lastName">Ingrese su apellido:</label>
        <input
        type="text"
        id="lastName"
        value={LastName}
        placeholder="Pérez"
        onChange={(event) => setLastName(event.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
        type="text"
        id="username"
        value={username}
        placeholder="pedro_perez"
        onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="email">Correo electrónico:</label>
        <input
        type="email"
        id="email"
        placeholder="michelle@gmail.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Registrarse</button>
        <button onClick={(e)=>handleRegistroGoogle(e)} className="button">Enter with Google</button>
    </form>
    </div>
    );
}

export default Registro;


