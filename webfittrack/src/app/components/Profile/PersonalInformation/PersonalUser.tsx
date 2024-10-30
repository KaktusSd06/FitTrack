"use client";

import styles from "./Personal.module.css";
import { Input } from "@nextui-org/input";
import { Button, Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";

const PersonalUser: React.FC = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const handleStartEdit = () => {
    setIsReadOnly(false);
  };

  const handleEndEdit = () => {
    setIsReadOnly(true);
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.TitleContainer}>
        <p className={styles.ProfileTitle}>Алфьоров Ростислав Віталійович</p>
      </div>
      <Tabs
        onSelectionChange={handleEndEdit}
        classNames={{
          cursor: "w-full bg-[#e48100]",
          tabContent: `group-data-[selected=true]:text-[#e48100]  ${styles.tabLabel}`,
          tabList: "pt-[20px] px-[20px]",
        }}
        key="underlined"
        variant="underlined"
        aria-label="DataTabs"
      >
        <Tab className={styles.Tab} key="PersonalData" title="Персональні дані">
          <div className={styles.DataContainer}>
            <div className={styles.InputsContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Прізвище:</label>
                <Input
                  isReadOnly={isReadOnly}
                  type="text"
                  placeholder="Введіть ваше прізвище"
                  variant="bordered"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Ім&apos;я:</label>
                <Input
                  isReadOnly={isReadOnly}
                  type="text"
                  variant="bordered"
                  placeholder="Введіть ваше ім'я"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>По батькові:</label>
                <Input
                  isReadOnly={isReadOnly}
                  type="text"
                  variant="bordered"
                  placeholder="Введіть ваше по батькові"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Ріст:</label>
                <Input
                  isReadOnly={isReadOnly}
                  type="Number"
                  variant="bordered"
                  placeholder="00"
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
                  isReadOnly={isReadOnly}
                  type="Number"
                  placeholder="00"
                  variant="bordered"
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
                className={styles.Button}
                onClick={handleStartEdit}
                startContent={
                  <img src="/edit.svg" alt="" className={styles.ButtonIcon} />
                }
              >
                Редагувати дані
              </Button>
              <Button
                onClick={handleEndEdit}
                className={styles.Button}
                startContent={
                  <img className={styles.ButtonIcon} src="/save.svg" alt="" />
                }
              >
                Зберегти
              </Button>
              <Button
                className={styles.Button}
                startContent={
                  <img className={styles.ButtonIcon} src="/cancel.svg" alt="" />
                }
              >
                Скасувати
              </Button>
            </div>
          </div>
        </Tab>
        <Tab className={styles.Tab} key="AccountData" title="Дані аккаунту">
          <div className={styles.DataContainer}>
            <div className={styles.InputsContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Телефон:</label>
                <Input
                  isReadOnly={isReadOnly}
                  type="text"
                  placeholder="#########"
                  variant="bordered"
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
                  isReadOnly={isReadOnly}
                  type="email"
                  variant="bordered"
                  placeholder="Введіть вашу електронну адресу"
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.ButtonsContainer}>
              <Button
                onClick={handleStartEdit}
                className={styles.Button}
                startContent={
                  <img className={styles.ButtonIcon} src="/edit.svg" alt="" />
                }
              >
                Редагувати дані
              </Button>
              <Button
                onClick={handleEndEdit}
                className={styles.Button}
                startContent={
                  <img className={styles.ButtonIcon} src="/save.svg" alt="" />
                }
              >
                Зберегти
              </Button>
              <Button
                className={styles.Button}
                startContent={
                  <img className={styles.ButtonIcon} src="/cancel.svg" alt="" />
                }
              >
                Скасувати
              </Button>
            </div>
          </div>
        </Tab>
        <Tab className={styles.Tab} key="Gyms" title="Спортивний центр">
          <div className={styles.DataContainer}>
            <div className={styles.Container}>
              <div className={styles.TitleIcon}>
                <p className={styles.Title}>Спортивний центр</p>
              </div>
              <div className={styles.TextContainer}>
                <p className={styles.Text}>Зал №1</p>
                <p className={styles.Text}>м. Хмельницький пр. Миру 32</p>
              </div>
            </div>
            <div className={styles.Container}>
              <div className={styles.TitleIcon}>
                <p className={styles.Title}>Абонемент</p>
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

export default PersonalUser;
