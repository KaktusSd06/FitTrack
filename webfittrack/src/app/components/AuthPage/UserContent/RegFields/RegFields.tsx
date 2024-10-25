"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../UserContent/UserContent.module.css";
import Field from "../Field/Field";
import Button from "../Button/Button";

const RegFields: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleButtonClick = () => {
    console.log("Button clicked");
  };
  return (
    <>
      <div className={styles.UserMain}>
        <div className={styles.FormFields}>
          <div className={styles.Fields}>
            <Field
              label="Електронна адреса"
              type="email"
              value={email}
              onChange={handleEmailChange}
            ></Field>
            <Field
              label="Телефон"
              type="phone"
              value={phone}
              onChange={handlePhoneChange}
            ></Field>
            <Field
              label="Пароль"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            ></Field>
            <Field
              label="Підтвердіть пароль"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            ></Field>
          </div>
          <div className={styles.Buttons}>
            <Button label="Зареєструватись" onClick={handleButtonClick} />
            <Button label="Зареєструватись з Google" />
          </div>
        </div>
      </div>
      <div className={styles.TextAndLink}>
        <span className={styles.text}>Вже маєте аккаунт?</span>
        <a href="/login" className={styles.link}>
          Увійти
        </a>
      </div>
    </>
  );
};

export default RegFields;
