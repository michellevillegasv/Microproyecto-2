import styles from "./TextField.module.css";

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *   label?: string;
 * }} TextFieldProps
 */

/** @param {TextFieldProps} props */
export default function TextField({ label, ...props }) {
  return (
    <label className={styles.field}>
      {label && <div>{label}</div>}
      <input {...props} />
    </label>
  );
}
