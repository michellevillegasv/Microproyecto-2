import {
  createUserWithEmailAndPassword,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegistroSubmit() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(
          "Usuario registrado correctamente:",
          userCredential.user.uid,
          window.location.href = "http://localhost:5173/"
        );

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
            console.error(
              "Error al guardar datos de registro en Firestore:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error al registrar usuario:", error.message);
      });
  }
  function handleClick() {
    window.location.href = "http://localhost:5173/sign-up-google";

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
        <TextField
          name="email"
          type="email"
          label="Correo electrónico"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          name="password"
          type="password"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className={styles.actions}>
        <Button onClick={handleRegistroSubmit}>Registrarse</Button>
        <Button variant="text" onClick={handleClick}>
          Iniciar sesión con Google
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
}
