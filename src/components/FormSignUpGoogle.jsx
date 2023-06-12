import {
    GoogleAuthProvider,
    signInWithPopup
  } from "firebase/auth";
  import { addDoc, collection } from "firebase/firestore";
  import { useState } from "react";
  import Button from "../components/Button";
  import TextField from "../components/TextField";
  import ArrowRightIcon from "../components/icons/ArrowRightIcon";
  import { auth, db } from "../firebaseConfig";
  import styles from "./FormSignUp.module.css";
  
  export default function FormSignUp() {
    const [name, setName] = useState("");
    const [LastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
  
    function handleRegistroGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log("Usuario inició sesión correctamente:", user.uid);
  
          const userGoogle = {
            name: name,
            LastName: LastName,
            username: username,
            email: user.email,
          };
          addDoc(collection(db, "users"), userGoogle)
            .then(() => {
              console.log("Datos de registro guardados en Firestore");
              window.location.href = "http://localhost:5173/";
            })
            .catch((error) => {
              console.error(
                "Error al guardar datos de registro en Firestore:",
                error
              );
            });
        })
        .catch((error) => {
          console.error(
            "Error al iniciar sesión con cuenta de Google:",
            error.message
          );
        });
    }

    function handleLoginGo(){
      window.location.href = "http://localhost:5173/login";
    }
  
    return (
      <div className={styles.form}>
        <div className={styles.icon}></div>
        <h1>Crear cuenta</h1>
        <div className={styles.fields}>
          <TextField
            name="name"
            label="Nombre"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            name="lastName"
            label="Apellido"
            placeholder="Ingrese su apellido"
            value={LastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            name="username"
            label="Username"
            placeholder="Ingrese su nombre de usuario"
            autoComplete="none"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <Button variant="text" onClick={handleRegistroGoogle}>
            Iniciar sesión con Google
            <ArrowRightIcon />
          </Button>
          <Button variant="text2" onClick={handleLoginGo}>
            ¿Ya tienes una cuenta? Login
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    );
  }