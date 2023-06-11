import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

/** @typedef {{ images: string[] }} HeroProps */

/** @param {HeroProps} props */
export default function Hero({ images }) {
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
