"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import { DatePicker, Link, Input, Button } from "@nextui-org/react";
import styles from "../Login/Login.module.css";

const Reg: NextPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isContinueClicked, setIsContinueClicked] = useState(false);
  const handleContinueClick = () => setIsContinueClicked(true);
  const handleBackClick = () => setIsContinueClicked(false);
  return (
    <div className={styles.Container}>
      <div className={styles.ContainerWrapper}>
        <div className={styles.MainContainer}>
          <div className={styles.LogoContainer}>
            <img className={styles.Logo} src="/Logo.svg"></img>
            <p className={styles.LogoText}>FitTrack</p>
          </div>
          <div className={styles.FormElements}>
            {isContinueClicked ? (
              <div className={styles.FormElements}>
                <div className={styles.FieldContainer}>
                  <Input type="text" variant="bordered" label="Прізвище" />
                  <Input type="email" variant="bordered" label="Ім'я" />
                  <Input type="email" variant="bordered" label="По батькові" />
                  <DatePicker label={"Дата народження"} variant="bordered" />
                </div>
                <div className={styles.ButtonContainer}>
                  <Button
                    variant="flat"
                    className={`bg-[#E48100] text-white rounded-[8px]`}
                  >
                    Зареєструватись
                  </Button>
                  <Button
                    onClick={handleBackClick}
                    className={`bg-[#E48100] text-white rounded-[8px]`}
                    variant="flat"
                    startContent={
                      <img
                        src="/AuthPage/undo.svg"
                        // alt="G"
                        className={`w-[25px]`}
                      />
                    }
                  >
                    До попереднього кроку
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.FormElements}>
                <div className={styles.FieldContainer}>
                  <Input
                    type="text"
                    variant="bordered"
                    label="Номер телефону"
                  />
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
                  <Input
                    label="Підтвердіть пароль"
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
                    onClick={handleContinueClick}
                    variant="flat"
                    className={`bg-[#E48100] text-white rounded-[8px]`}
                  >
                    Продовжити
                  </Button>
                  <Button
                    onClick={handleContinueClick}
                    className={`bg-[#E48100] text-white rounded-[8px]`}
                    variant="flat"
                    startContent={
                      <img
                        src="/AuthPage/flat-color-icons_google.svg"
                        alt="G"
                        className={`w-[25px]`}
                      />
                    }
                  >
                    Продовжити з Google
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.LinkWrapper}>
          <p className={styles.LinkText}>Вже маєте аккаунт?</p>
          <Link className={styles.Link}>Увійти</Link>
        </div>
      </div>
    </div>
  );
};

export default Reg;
