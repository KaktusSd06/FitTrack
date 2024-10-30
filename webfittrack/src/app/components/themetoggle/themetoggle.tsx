"use client";
import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import styles from "./themetoggle.module.css";

const Toggle: NextPage = () => {
  const [isDefault, setIsDefault] = useState(true);

  const toggleImage = () => {
    setIsDefault(!isDefault);
  };

  return (
    <div
      className={`${styles.toggle} ${isDefault ? styles.togglewhite : styles.toggleblack}`}
      onClick={toggleImage}
    >
      {isDefault ? (
        <Image
          className={styles.white}
          src="/images/wb-sunny.svg"
          alt="Default Image"
          width={26}
          height={26}
        />
      ) : (
        <Image
          className={styles.black}
          src="/images/group.svg"
          alt="Variant 2 Image"
          width={26}
          height={26}
        />
      )}
    </div>
  );
};

export default Toggle;
