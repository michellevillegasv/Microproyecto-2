import styles from "./Spinner.module.css";

/** @param {React.SVGAttributes<SVGElement>} props */
export default function Spinner(props) {
  return (
    <div className={styles.spinner}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        {...props}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 27.9589C16.6703 27.9861 16.3368 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16H32C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C16.3358 32 16.6693 31.9897 17 31.9693V27.9589Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
