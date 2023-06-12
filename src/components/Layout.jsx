import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styles from "./Footer.module.css";
import Header from "./Header";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
