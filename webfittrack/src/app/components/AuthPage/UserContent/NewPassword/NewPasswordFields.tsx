"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../UserContent/UserContent.module.css";
import Field from "../Field/Field";
import Button from "../Button/Button";

const NewPassFields: NextPage = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleButtonClick = () => {
    console.log("Button clicked");
  };
  return (
    <>
      <div className={styles.UserMain}>
        <div className={styles.FormFields}>
          <span className={styles.HelpText}>Придумайте новий пароль</span>
          <div className={styles.Fields}>
            <Field
              label="Введіть новий пароль"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            ></Field>
            <Field
              label="Підтвердіть новий пароль"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            ></Field>
          </div>
          <div className={styles.Buttons}>
            <Button label="Змінити" onClick={handleButtonClick} />
          </div>
        </div>
      </div>
      <div className={styles.TextAndLink}>
        <span className={styles.text}>Не маєте аккаунту?</span>
        <a href="/reg" className={styles.link}>
          Зареєструвати
        </a>
      </div>
    </>
  );
};

export default NewPassFields;
