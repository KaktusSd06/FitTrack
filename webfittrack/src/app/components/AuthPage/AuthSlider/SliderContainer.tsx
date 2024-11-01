"use client";

import { useState } from "react";
import SliderItem from "./SliderItem";
import styles from "./SliderContainer.module.css";

const slides = [
  {
    text: "FitTrack допоможе слідкувати за своїм прогресом",
    imageUrl: "/AuthPage/AuthSliderPhoto1.jpg",
  },
  {
    text: "Досягайте нових висот з FitTrack",
    imageUrl: "/AuthPage/AuthSliderPhoto2.jpg",
  },
  {
    text: "Ваші тренування під контролем",
    imageUrl: "/AuthPage/AuthSliderPhoto3.jpg",
  },
];

const SliderContainer: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Стан для зберігання поточного слайду

  // Перемикаємо на наступний слайд
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Перемикаємо на попередній слайд
  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className={styles.slidercontainer}>
      {/* Виводимо тільки один слайд */}
      <SliderItem
        text={slides[currentSlide].text}
        imageUrl={slides[currentSlide].imageUrl}
      />

      {/* Зона для навігації вліво */}
      <div className={styles.leftNav} onClick={goToPreviousSlide}>
        {/* <span className={styles.arrow}>&lt;</span> */}
      </div>

      {/* Зона для навігації вправо */}
      <div className={styles.rightNav} onClick={goToNextSlide}>
        {/* <span className={styles.arrow}>&gt;</span> */}
      </div>

      {/* Кнопки для перемикання слайдів */}
      <div className={styles.sliderbuttons}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={
              index === currentSlide
                ? styles.sliderbuttonsItem
                : styles.sliderbuttonsChild
            }
            onClick={() => setCurrentSlide(index)} // Перемикаємо на відповідний слайд
          />
        ))}
      </div>
    </div>
  );
};

export default SliderContainer;
