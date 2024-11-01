"use client";
import { Button } from "@nextui-org/button";
import { Textarea, Input } from "@nextui-org/react";
import styles from "./Contact.module.css";

import { FC } from "react";
const Contact: FC = () => {
  return (
    <form className={styles.forminputs}>
      <div className={styles.names}>
        <div className={styles.fname}>
          <Input label="Прізвище" radius="sm" />
        </div>
        <div className={styles.fname}>
          <Input label="Ім'я" isRequired radius="sm" />
        </div>
      </div>
      <div className={styles.email}>
        <Input type="email" label="Електронна пошта" radius="sm" />
      </div>
      <div className={styles.phone}>
        <Input type="tel" label="Телефон" radius="sm" isRequired />
      </div>
      <div className={styles.message}>
        <Textarea label="Повідомлення" radius="sm" disableAutosize />
      </div>
      <Button className={styles.submit}>Надіслати</Button>
    </form>
  );
};

export default Contact;
