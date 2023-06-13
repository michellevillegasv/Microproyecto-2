import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../views/Auth";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Saman Flicks" />
      </Link>
      <div className={styles.actions}>
        {user ? (
          <>
            <Link to="/dashboard">Perfil</Link>
            <Link
              onClick={async () => {
                await logout();
                navigate("/");
              }}
            >
              Cerrar sesión
            </Link>
          </>
        ) : (
          <Link to="/login">Ingresar</Link>
        )}
      </div>
    </header>
  );
}
