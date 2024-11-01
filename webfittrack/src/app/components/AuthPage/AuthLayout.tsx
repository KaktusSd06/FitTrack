import type { NextPage } from "next";
import SliderContainer from "./AuthSlider/SliderContainer";
import styles from "./AuthLayout.module.css";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: NextPage<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.AuthContainer}>
        <div className={styles.Slider}>
          <SliderContainer />
        </div>
        <div className={styles.UserContainer}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
