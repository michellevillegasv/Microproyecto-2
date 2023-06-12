import Button from "./Button";
import styles from "./SearchBar.module.css";

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *   onSubmit: Function;
 * }} SearchBarProps
 */

/** @param {SearchBarProps} props */
export default function SearchBar({ onSubmit = () => {}, ...props }) {
  return (
    <form className={styles.field} onSubmit={onSubmit}>
      <input {...props} />
      <Button type="submit">Buscar</Button>
    </form>
  );
}
