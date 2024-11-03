// themetoggle.tsx
"use client";
import { useTheme } from "../../context/ThemeContext";
import Image from "next/image";
import type { NextPage } from "next";
import styles from "./themetoggle.module.css";

const Toggle: NextPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`${styles.toggle} ${
        isDarkMode ? styles.toggleblack : styles.togglewhite
      }`}
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <Image
          className={styles.black}
          src="/images/group.svg"
          alt="Dark Mode Image"
          width={26}
          height={26}
        />
      ) : (
        <Image
          className={styles.white}
          src="/images/wb-sunny.svg"
          alt="Light Mode Image"
          width={26}
          height={26}
        />
      )}
    </div>
  );
};

export default Toggle;
