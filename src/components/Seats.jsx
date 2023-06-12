import Seat from "./Seat";
import styles from "./Seats.module.css";

/**
 * @typedef {{
 *   seats: import("./Seat").SeatProps[];
 *   onSelect: (id: number, status: import("./Seat").SeatStatus) => void;
 * }}
 */

export default function Seats({ seats, onSelect }) {
  return (
    <div className={styles.seats}>
      {seats.map(({ id, status }) => (
        <Seat key={id} status={status} onClick={() => onSelect(id, status)} />
      ))}
    </div>
  );
}
