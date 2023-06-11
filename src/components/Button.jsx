import { Link } from "react-router-dom";
import styles from "./Button.module.css";

/**
 * @typedef {import("react-router-dom").LinkProps & {
 *   variant?: "filled" | "text" | "icon";
 * }} ButtonProps
 */

/** @param {ButtonProps} props */
export default function Button({ variant = "filled", ...props }) {
  return props.to ? (
    <Link {...props} className={[styles.button, styles[variant]].join(" ")} />
  ) : (
    <button {...props} className={[styles.button, styles[variant]].join(" ")} />
  );
}
