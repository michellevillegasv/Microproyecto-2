import Seat from "./Seat";
import styles from "./Seats.module.css";

export default function Seats({ seats }) {
  return (
    <div className={styles.seats}>
      {seats.map(({ id, status }) => (
        <Seat key={id} status={status} />
      ))}
    </div>
  );
}
