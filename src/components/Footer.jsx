import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <Link to="/">
          <img src={logo} alt="Saman Flicks" />
        </Link>
        <div className={styles.footerText}>
            <div>peliculas@unimet.edu.ve</div>
            <div>Creadores Michelle Villegas y Andrés Goncalves</div>
        </div>
      </footer>
    );
}