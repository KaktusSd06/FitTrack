"use client";

import type { NextPage } from "next";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter, Link, Input, Button } from "@nextui-org/react";
import styles from "./Login.module.css";


const Login: NextPage = () => {

  useEffect(() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
    // Отримання параметрів запиту з URL
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    const passwordParam = params.get("password");

    // Встановлення значень, якщо вони є
    if (emailParam) setEmail(emailParam);
    if (passwordParam) setPassword(passwordParam);

    if (emailParam || passwordParam) {
      router.replace("/pages/Login");
    }

  }, []);


  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExistsError, setUserExistsError] = useState('');
  const [allFieldReqiredError, setAllFieldReqiredError] = useState('');
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const checkReqiredFields = async () => {
    return (email && password);
  }


  useEffect(() => {
    if (userId) {
      const currentUser = {
        userId,
        email,
        role,
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [userId]);

  const loginAs = async (role: string) => {
    onClose();

    setRole(role);
    await getUser();
    // const currentUser = {
    //   userId, // тут вже буде правильний userId
    //   email,
    //   role,
    // };

    // localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setLoading(true);
    router.push(`/pages/${role}`);
  }

  const getUser = async (): Promise<boolean | undefined> => {
    try {
      const response = await fetch(`/api/proxy/Users/get-by-email/${email}`, {
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
        console.log(data.id);
        setUserId(data.id);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      return false;
    }
  };

  const login = async () => {
    if (!(await checkReqiredFields())) {
      setAllFieldReqiredError("Заповніть обов'язкові поля");
      return false;
    } else {
      setAllFieldReqiredError("");
    }

    try {
      const loginData = {
        email,
        password,
      };

      const response = await fetch(`/api/proxy/Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const { accessToken, refreshToken } = data;

      // Зберігаємо токени у sessionStorage
      if (accessToken && refreshToken) {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        onOpen();
      } else {
        setUserExistsError("Не вдалося отримати токен.");
      }

    } catch (error) {
      console.error('Error logging in user:', error);
      setUserExistsError("Неправильна електронна адреса або пароль.");
      return false;
    }
  };

  return (
    <div className={styles.Container}>
      {loading ? ( // Якщо loading true, показуємо CircularProgress
        <div className={styles.LoadingContainer}>
          <CircularProgress classNames={{
            // svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-[--fulvous]",
            // track: "bg-black",
            // value: "text-3xl font-semibold text-white",
          }} />
        </div>
      ) : (
        <>
          <div className={styles.ContainerWrapper}>
            <div className={styles.MainContainer}>
              <div className={styles.LogoContainer}>
                <img className={styles.Logo} src="/Logo.svg"></img>
                <p className={styles.LogoText}>FitTrack</p>
              </div>
              <div className={styles.FormElements}>
                <div className={styles.FieldContainer}>
                  <Input
                    type="email"
                    value={email}
                    variant="bordered"
                    label="Електронна адреса"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setAllFieldReqiredError("");
                      setUserExistsError("");
                    }}
                  />
                  <Input
                    label="Пароль"
                    variant="bordered"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setAllFieldReqiredError("");
                      setUserExistsError("");
                    }}
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
                {allFieldReqiredError && (
                  <p className="text-[14px] text-danger">{allFieldReqiredError}</p>
                )}
                {userExistsError && (
                  <p className="text-[14px] text-danger">{userExistsError}</p>
                )}
                <div className={styles.ButtonContainer}>
                  <Button
                    onClick={login}
                    variant="flat"
                    className="bg-[#E48100] text-white rounded-[8px]"
                  >
                    Увійти
                  </Button>
                </div>
              </div>
              <div className={styles.LinkWrapper}>
                <p className={styles.LinkText}>Забули пароль?</p>
                <Link className={styles.Link} onClick={() => setLoading(true)} href="/pages/ResetPassword">Відновити</Link>
              </div>
            </div>
            <div className={styles.LinkWrapper}>
              <p className={styles.LinkText}>Не маєте аккаунту?</p>
              <Link className={styles.Link} onClick={() => setLoading(true)} href="/pages/Register">Зареєструватись</Link>
            </div>
          </div>
          <Modal hideCloseButton isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              <>
                <ModalHeader className="flex flex-col gap-1">Вхід успішно виконано!</ModalHeader>
                <ModalBody>
                  <p>Оберіть, як зайти:</p>
                </ModalBody>
                <ModalFooter className="justify-center">
                  <Button
                    id="User"
                    className="bg-[--fulvous] text-white"
                    variant="light"
                    onPress={() => loginAs("User")}
                  >
                    Як користувач
                  </Button>
                  <Button
                    id="Owner"
                    className="bg-[--fulvous] text-white"
                    variant="light"
                    onPress={() => loginAs("Owner")}
                  >
                    Як власник
                  </Button>
                </ModalFooter>
              </>
            </ModalContent>
          </Modal>
        </>
      )}
    </div >
  );
};

export default Login;