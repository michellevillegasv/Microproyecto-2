import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../views/Auth";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Saman Flicks" />
      </Link>
      <div className={styles.actions}>
        {user ? (
          <>
            <Link to="/dashboard">Perfil</Link>
            <Link onClick={logout}>Cerrar sesión</Link>
          </>
        ) : (
          <Link to="/login">Ingresar</Link>
        )}
      </div>
    </header>
  );
}
