import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Button from "./Button";
import styles from "./Header.module.css";
import MenuIcon from "./icons/MenuIcon";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="Saman Flicks" />
      </Link>
      <Button variant="icon">
        <MenuIcon style={{ fontSize: 32 }} />
      </Button>
    </header>
  );
}
