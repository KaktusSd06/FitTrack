"use client";

import type { NextPage, ReactNode } from "next";
import styles from "./UserContent.module.css";
import RegFields from "../RegFields/RegFields";

type UserContentProps = {
  children: ReactNode; // Додаємо тип для children
};

const UserContent: NextPage<UserContentProps> = ({ children }) => {
  return (
    <div className={styles.UserContainer}>
      <div className={styles.UserContent}>
        <div className={styles.LogoContainer}>
          <img className={styles.Logo} src="/Logo.svg"></img>
          <span className={styles.LogoText}>FitTrack</span>
        </div>
        <div
          className={
            children == RegFields ? styles.Container : styles.RegContainer
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserContent;
