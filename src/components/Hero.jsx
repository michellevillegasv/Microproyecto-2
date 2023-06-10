import { useEffect, useMemo, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const images = useMemo(
    () => [
      "https://www.unimet.edu.ve/wp-content/uploads/2021/03/MODULO-DE-AULAS-ahora-1030x687.jpg",
      "https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa-52.jpg",
      "https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa.jpg",
      "https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa-30.jpg",
      "https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa-50.jpg",
    ],
    []
  );

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={styles.hero}>
      <div className={styles.carrousel}>
        {images.map((image, index) => (
          <img
            key={index}
            className={
              index == currentImage
                ? styles.current
                : index == (currentImage + 1) % images.length
                ? styles.right
                : styles.left
            }
            src={image}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}
