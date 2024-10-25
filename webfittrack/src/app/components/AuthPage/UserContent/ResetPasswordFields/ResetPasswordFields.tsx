"use client";

import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../UserContent/UserContent.module.css";
import Field from "../Field/Field";
import Button from "../Button/Button";

const ResetPasswordFields: NextPage = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className={styles.UserMain}>
        <div className={styles.FormFields}>
          <span className={styles.HelpText}>
            Введіть електронну адресу для відновленню паролю
          </span>
          <div className={styles.Fields}>
            <Field
              label="Електронна адреса"
              type="email"
              value={email}
              onChange={handleEmailChange}
            ></Field>
          </div>
          <div className={styles.Buttons}>
            <Button label="Відновити" />
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

export default ResetPasswordFields;
