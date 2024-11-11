"use client";

import { User } from "@/app/Interfaces/Interfaces";
import styles from "./Personal.module.css";
import { Input } from "@nextui-org/input";
import { Button, Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";

const PersonalUser: React.FC = () => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User>();

  const handleStartEdit = () => {
    setIsReadOnly(false);
  };

  const handleEndEdit = () => {
    setIsReadOnly(true);
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;
    setUserId(id);
  }, []);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getUser = async (): Promise<boolean | undefined> => {
    try {
      const response = await fetch(`/api/proxy/Users/get-by-id/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return false;
    }
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.TitleContainer}>
        <p className={styles.ProfileTitle}>{user?.firstName} {user?.middleName} {user?.lastName}</p>
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
                  value={user?.lastName}
                  type="text"
                  variant="bordered"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Ім&apos;я:</label>
                <Input
                  isReadOnly={isReadOnly}
                  value={user?.firstName}
                  type="text"
                  variant="bordered"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>По батькові:</label>
                <Input
                  isReadOnly={isReadOnly}
                  value={user?.middleName}
                  type="text"
                  variant="bordered"
                  className={styles.input}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Ріст:</label>
                <Input
                  isReadOnly={isReadOnly}
                  value={user?.height || ""}
                  type="Number"
                  variant="bordered"
                  className={styles.input}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">см</span>
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
                  value={user?.phoneNumber}
                  type="text"
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
                  value={user?.email}
                  type="email"
                  variant="bordered"
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
