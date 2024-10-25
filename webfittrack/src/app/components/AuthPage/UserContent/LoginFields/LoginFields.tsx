"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../UserContent/UserContent.module.css";
import Field from "../Field/Field";
import Button from "../Button/Button";

const LoginFields: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
          <div className={styles.Fields}>
            <Field
              label="Електронна адреса"
              type="email"
              value={email}
              onChange={handleEmailChange}
            ></Field>
            <Field
              label="Пароль"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            ></Field>
          </div>
          <div className={styles.Buttons}>
            <Button label="Увійти" onClick={handleButtonClick} />
            <Button label="Увійти з Google" />
          </div>
        </div>
        <div className={styles.TextAndLink}>
          <span className={styles.text}>Забули пароль?</span>
          <a href="/resetpassword" className={styles.link}>
            Відновити
          </a>
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

export default LoginFields;
