import styles from "./Seat.module.css";

/**
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement> & {
 *   status: "available" | "selected" | "unavailable";
 * }} SeatProps
 */

/** @param {SeatProps} props */
export default function Seat({ status, ...props }) {
  return (
    <button {...props} className={[styles.seat, styles[status]]}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.00004 8.49998C7.00004 8.5 7.00004 8.50001 7.00004 8.50002V18.5C7.00004 18.792 6.95831 19.0743 6.88049 19.3412C7.23575 19.4446 7.61142 19.5 8.00004 19.5H16C16.3887 19.5 16.7643 19.4446 17.1196 19.3412C17.0418 19.0743 17 18.792 17 18.5V8.50002C17 8.50001 17 8.5 17 8.49998H7.00004Z"
          fill="curentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.5003 8.45845C17.5001 8.47228 17.5 8.48613 17.5 8.50002V18.5C17.5 19.8807 18.6193 21 20 21C21.3807 21 22.5 19.8807 22.5 18.5V8.50002C22.5 7.1193 21.3807 6.00002 20 6.00002C19.9861 6.00002 19.9723 6.00013 19.9585 6.00035C19.7476 7.25632 18.7563 8.24759 17.5003 8.45845Z"
          fill="curentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.04154 6.00035C4.02772 6.00013 4.01387 6.00002 4 6.00002C2.61929 6.00002 1.5 7.1193 1.5 8.50002V18.5C1.5 19.8807 2.61929 21 4 21C5.38071 21 6.5 19.8807 6.5 18.5V8.50002C6.5 8.48613 6.49989 8.47228 6.49966 8.45845C5.24369 8.24759 4.25241 7.25632 4.04154 6.00035Z"
          fill="curentColor"
        />
        <rect
          x="4.5"
          y="8.00002"
          width="5"
          height="15"
          rx="2.5"
          transform="rotate(-90 4.5 8.00002)"
          fill="curentColor"
        />
      </svg>
    </button>
  );
}
