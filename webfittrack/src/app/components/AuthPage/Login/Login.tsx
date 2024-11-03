"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import { Link, Input, Button } from "@nextui-org/react";
import styles from "./Login.module.css";

const Login: NextPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className={styles.Container}>
      <div className={styles.ContainerWrapper}>
        <div className={styles.MainContainer}>
          <div className={styles.LogoContainer}>
            <img className={styles.Logo} src="/Logo.svg"></img>
            <p className={styles.LogoText}>FitTrack</p>
          </div>
          <div className={styles.FormElements}>
            <div className={styles.FieldContainer}>
              <Input
                type="email"
                variant="bordered"
                label="Електронна адреса"
              />
              <Input
                label="Пароль"
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <img
                        src="/AuthPage/visibility_off.svg"
                        alt="Hide password"
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    ) : (
                      <img
                        src="/AuthPage/visibility.svg"
                        alt="Show password"
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full"
              />
            </div>
            <div className={styles.ButtonContainer}>
              <Button
                variant="flat"
                className={`bg-[#E48100] text-[var(--text-color)] rounded-[8px]`}
              >
                Увійти
              </Button>
              <Button
                className={`bg-[#E48100] text-[var(--text-color)] rounded-[8px]`}
                variant="flat"
                startContent={
                  <img
                    src="/AuthPage/flat-color-icons_google.svg"
                    alt="G"
                    className={`${styles.GoogleLogo} w-[25px]`}
                  />
                }
              >
                Увійти з Google
              </Button>
            </div>
          </div>
          <div className={styles.LinkWrapper}>
            <p className={styles.LinkText}>Забули пароль?</p>
            <Link className={styles.Link}>Відновити</Link>
          </div>
        </div>
        <div className={styles.LinkWrapper}>
          <p className={styles.LinkText}>Не маєте аккаунту?</p>
          <Link className={styles.Link}>Зареєструватись</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
