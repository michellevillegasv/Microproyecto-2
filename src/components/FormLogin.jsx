import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { auth } from "../firebaseConfig";
import styles from "./FormLogin.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleEmailLogin(event) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario inició sesión correctamente:", user.uid);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
        console.error(
          "Error al iniciar sesión con correo electrónico y contraseña:",
          error.message
        );
      });
  }

  function handleGoogleLogin(event) {
    event.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Usuario inició sesión correctamente:", user.uid);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
        console.error(
          "Error al iniciar sesión con cuenta de Google:",
          error.message
        );
      });
  }

  return (
    <div className={styles.form}>
      <div className={styles.icon}></div>
      <h1>Login</h1>
      <div className={styles.fields}>
        <TextField
          name="email"
          label="Correo"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          name="password"
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className={styles.actions}>
        <Button onClick={handleEmailLogin}>Iniciar Sesión</Button>
        <Button variant="text" onClick={handleGoogleLogin}>
          Iniciar Sesión con Google
        </Button>
        <Button variant="text" to="/sign-up" replace>
          ¿No tienes una cuenta? Regístrate
        </Button>
      </div>
    </div>
  );
}

export default Login;
