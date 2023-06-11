import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  function handleEmailLogin(event) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log("Usuario inició sesión correctamente:", user.uid);
      })
      .catch((error) => {
        console.error("Error al iniciar sesión con correo electrónico y contraseña:", error.message);
      });
  }

  function handleGoogleLogin(event) {
    event.preventDefault();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Usuario inició sesión correctamente:", user.uid);
      })
      .catch((error) => {
        console.error("Error al iniciar sesión con cuenta de Google:", error.message);
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin}>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
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
        <button type="submit">Iniciar sesión</button>
      </form>
      <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
    </div>
  );
}

export default Login