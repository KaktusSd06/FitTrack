import type { NextPage } from "next";
import styles from "./UserContent.module.css";
import Button from "../Button/Button";
import Image from 'next/image';

const UserContent: NextPage = () => {
  return (
    <div className={styles.UserContainer}>
      <div className={styles.UserContent}>
        <div className={styles.UserMain}>
          <div className={styles.LogoContainer}>
            <Image className={styles.Logo} width={50} height={50} alt="Logo" src="/Logo.svg"/>
            <span className={styles.LogoText}>FitTrack</span>
          </div>
          <div className={styles.FormFields}>
            <div className={styles.Fields}>
              
            </div>
            <div className={styles.Buttons}>
              <Button label="Увійти" />
              <Button label="Увійти з Google" />
            </div>
          </div>
          <div className={styles.TextAndLink}>
            <span className={styles.text}>Забули пароль?</span>
            <a className={styles.link}>Відновити</a>
          </div>
        </div>
        <div className={styles.TextAndLink}>
          <span className={styles.text}>Не маєте аккаунту?</span>
          <a className={styles.link}>Зареєструвати</a>
        </div>
      </div>
    </div>
  );
};

export default UserContent;
