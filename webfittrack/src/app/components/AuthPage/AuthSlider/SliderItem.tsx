import React from "react";
import styles from "./SliderItem.module.css";

interface SliderItemProps {
  text: string;
  imageUrl: string;
}

const SliderItem: React.FC<SliderItemProps> = ({ text, imageUrl }) => {
  return (
    <div
      className={styles.slideritem}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.slidertext}>{text}</div>
    </div>
  );
};

export default SliderItem;
