"use client";

import styles from "./Personal.module.css";
import { Input } from "@nextui-org/input";
import { Button, Tabs, Tab } from "@nextui-org/react";

const PersonalOwner: React.FC = () => {
  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.TitleContainer}>
        <p className={styles.ProfileTitle}>Алфьоров Ростислав Віталійович</p>
      </div>
      <Tabs
        className={styles.Tabs}
        key="underlined"
        variant="underlined"
        aria-label="DataTabs"
      >
        <Tab key="PersonalData" title="Персональні дані">
          <div className={styles.DataContainer}>
            <div className={styles.InputsContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Прізвище</label>
                <Input
                  type="text"
                  placeholder="Введіть ваше прізвище"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Ім&apos;я:</label>
                <Input
                  type="text"
                  placeholder="Введіть ваше ім'я"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>По батькові:</label>
                <Input
                  type="text"
                  placeholder="Введіть ваше по батькові"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Ріст:</label>
                <Input
                  type="Number"
                  placeholder="###"
                  className={styles.input}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">см</span>
                    </div>
                  }
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Вага:</label>
                <Input
                  type="Number"
                  placeholder="###"
                  className={styles.input}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">кг</span>
                    </div>
                  }
                />
              </div>
            </div>
            <div className={styles.ButtonsContainer}>
              <Button
                startContent={
                  <img src="/edit.svg" alt="" className="w-5 h-5" />
                }
              >
                Редагувати дані
              </Button>
              <Button
                startContent={
                  <img src="/save.svg" alt="" className="w-5 h-5" />
                }
              >
                Зберегти
              </Button>
              <Button
                startContent={
                  <img src="/cancel.svg" alt="" className="w-5 h-5" />
                }
              >
                Скасувати
              </Button>
            </div>
          </div>
        </Tab>
        <Tab key="AccountData" title="Дані аккаунту">
          <div className={styles.DataContainer}>
            <div className={styles.InputsContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Телефон:</label>
                <Input
                  type="text"
                  placeholder="#########"
                  className={styles.input}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">+380</span>
                    </div>
                  }
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Електронна адреса:</label>
                <Input
                  type="email"
                  placeholder="Введіть вашу електронну адресу"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.ButtonsContainer}>
              <Button
                startContent={
                  <img src="/edit.svg" alt="" className="w-5 h-5" />
                }
              >
                Редагувати дані
              </Button>
              <Button
                startContent={
                  <img src="/save.svg" alt="" className="w-5 h-5" />
                }
              >
                Зберегти
              </Button>
              <Button
                startContent={
                  <img src="/cancel.svg" alt="" className="w-5 h-5" />
                }
              >
                Скасувати
              </Button>
            </div>
          </div>
        </Tab>
        <Tab key="Gyms" title="Спортивний центр">
          <div className={styles.DataContainer}>
            <div className={styles.Container}>
              <div className={styles.TitleIcon}>
                <p className={styles.Titie}>Спортивний центр</p>
              </div>
              <div className={styles.TextContainer}>
                <p className={styles.Text}>Зал №1</p>
                <p className={styles.Text}>м. Хмельницький пр. Миру 32</p>
              </div>
            </div>
            <div className={styles.Container}>
              <div className={styles.TitleIcon}>
                <p className={styles.Titie}>Абонемент</p>
              </div>
              <div className={styles.TextContainer}>
                <p className={styles.Text}>Залишилось тренувань: 10</p>
                <p className={styles.Text}>Ціна: 1000 грн</p>
                <p className={styles.Text}>Дійсний до 01.01.2025</p>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default PersonalOwner;
