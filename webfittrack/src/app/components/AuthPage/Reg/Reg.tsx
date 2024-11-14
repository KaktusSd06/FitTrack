"use client";

import type { NextPage } from "next";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, CheckboxGroup, DateInput, Link, Input, Button } from "@nextui-org/react";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import validator from "validator";
import styles from "../Login/Login.module.css";

const Reg: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [plainPhoneNumber, setPlainPhoneNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDate, setBirthDate] = useState<DateValue | null>(null);
  const [userExistsError, setUserExistsError] = useState('');
  const [confirmedPasswordError, setConfirmedPasswordError] = useState('');
  const [firstReqiredFieldsError, setFirstReqiredFieldsError] = useState('');
  const [secondReqiredFieldsError, setSecondReqiredFieldsError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [validateEmailError, setValidateEmailError] = useState('');
  const [validatePhoneError, setValidatePhoneError] = useState('');
  const [validatePasswordError, setValidatePasswordError] = useState('');


  const toggleVisibilityPass = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleVisibilityConfPass = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleContinueClick = () => setFormStep(formStep + 1);
  const handleBackClick = () => setFormStep(formStep - 1);

  const validateEmail = (email: string) => {

    if (validator.isEmail(email)) {
      return true;
    } else {
      return false;
    }
  };


  function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }


  const validatePhoneNumber = () => {
    if (validator.isMobilePhone(`${plainPhoneNumber}`, "uk-UA")) {
      return true;
    } else {
      return false;
    }
  };

  const handleEndRegistrationClick = () => {
    setIsSubmitted(true);
    if (selectedRoles.length > 0) {
      setIsSubmitted(false);
      registration();
    } else {
      setIsInvalid(true);
    }
  };


  const handleYesLoginClick = () => {
    const queryParams = new URLSearchParams({
      email: email,
      password: password,
    });
    window.location.href = `/pages/login?${queryParams.toString()}`;
  };

  const handleNoLoginClick = () => {
    onClose();
    router.push(`/pages/login`);
  }

  const formatDate = (date: DateValue | null): string => {
    if (!date) return "";

    const jsDate = date.toDate("UTC");
    console.log(jsDate.getDay(), jsDate.getUTCMonth(), jsDate.getFullYear());

    const day = String(jsDate.getDate()).padStart(2, "0");
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const year = jsDate.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const registerUser = async (registrationData: Record<string, unknown>): Promise<boolean | undefined> => {
    try {
      const response = await fetch(`/api/proxy/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 201) {
        return true;
      } else if (response.status === 500) {
        setFormStep(1);
        setRegistrationError('Користувач з таким номером телефону вже існує');

        return false;
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

    } catch (error) {
      console.error('Error registering user:', error);
      if (!registrationError) {
        setFormStep(1);
        setRegistrationError('Сталась помилка при реєстрації. Спробуйте ще раз');
      }
      return false;
    }
  };

  const registration = async () => {
    setRegistrationError('');
    const registrationData = {
      email,
      phoneNumber: plainPhoneNumber,
      password,
      confirmedPassword: confirmPassword,
      firstName,
      lastName,
      middleName,
      birthDate: formatDate(birthDate),
    };

    const isRegistered = await registerUser(registrationData);

    if (isRegistered) {
      selectedRoles.forEach(async (role) => {
        const assignRoleData = { userEmail: email, role };
        await setRoleToUser(assignRoleData);
      });
      onOpen();
    }
  };
  const setRoleToUser = async (assignRoleData: Record<string, unknown>): Promise<boolean | undefined> => {
    try {
      const response = await fetch(`/api/proxy/Account/assign-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignRoleData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      return response.status === 201;

    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  }


  const checkExistUser = async (): Promise<boolean | undefined> => {
    try {
      const response = await fetch(`/api/proxy/Users/get-by-email/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(email);
      if (!response.ok) {
        console.log(`Error: ${response.status} ${response.statusText}`);
      }
      if (response.status === 200) {
        return true;
      }
      if (response.status === 404) {
        return false;
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      return;
    }
  };

  const checkConfitmedPassword = () => {
    return password === confirmPassword;
  }

  const firstStepRegistration = async () => {
    // const plainPhone = `+38${getPlainPhoneNumber(phone)}`;
    // setPlainPhoneNumber(plainPhone);
    setUserExistsError("");
    if (email && plainPhoneNumber && password && confirmPassword) {
      setFirstReqiredFieldsError("");
    }
    else {
      setFirstReqiredFieldsError("Заповніть обов'язкові поля");
      return;
    }

    if (!validateEmail(email)) {
      setValidateEmailError("Введіть коректну електронну адресу")
      return;
    }
    else {
      setValidateEmailError("")
    }
    console.log(plainPhoneNumber);
    if (!validatePhoneNumber()) {
      setValidatePhoneError("Введіть коректний номер телефону");
      return;
    }
    else {
      setValidatePhoneError("");
    }

    if (!validatePassword(password)) {
      setValidatePasswordError("Недопустимий пароль. Пароль має мати великі та малі латинські літери, цифри, бути більше 8 і не мати спеціальних символів");
      return;
    }
    else {
      setValidatePasswordError("");
    }
    if (checkConfitmedPassword()) {
      setConfirmedPasswordError("");
    }

    else {
      setConfirmedPasswordError("Паролі не співпадають");
      return;
    }
    const userExists = await checkExistUser();
    if (userExists) {
      setUserExistsError("Користувач з такою електронною адресою вже існує");
      return;
    } else {
      setUserExistsError("");
    }

    handleContinueClick();
  };

  const formatPhoneNumber = (value: string) => {
    // Видаляємо всі символи, крім цифр
    const cleaned = value.replace(/\D/g, '');

    // Форматуємо за шаблоном "+38 (XXX) XXX-XX-XX"
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

    if (match) {
      return `(${match[1]}${match[2] ? ') ' + match[2] : ''}${match[3] ? '-' + match[3] : ''}${match[4] ? '-' + match[4] : ''}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
    setPlainPhoneNumber(`+38${getPlainPhoneNumber(formattedPhone)}`);
    setFirstReqiredFieldsError("");
    setRegistrationError("");
    setValidatePhoneError("");
  };

  const getPlainPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, ''); // Видаляє всі нечислові символи
  };


  const secondStepRegistration = async () => {
    if (firstName && lastName && formatDate(birthDate)) {
      setSecondReqiredFieldsError("");
      handleContinueClick();
    }
    else {
      setSecondReqiredFieldsError("Заповніть обов'язкові поля");
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.ContainerWrapper}>
        <div className={styles.MainContainer}>
          <div className={styles.LogoContainer}>
            <img className={styles.Logo} src="/Logo.svg" alt="Logo" />
            <p className={styles.LogoText}>FitTrack</p>
          </div>
          <div className={styles.FormElements}>
            {formStep === 1 && (
              <div className={styles.FormElements}>
                <div className={styles.FieldContainer}>
                  <Input
                    type="text"
                    variant="bordered"
                    label="Номер телефону"
                    value={phone}
                    isRequired
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className=" text-small">+38</span>
                      </div>
                    }
                    onChange={handlePhoneChange}
                  />
                  <Input
                    type="email"
                    variant="bordered"
                    label="Електронна адреса"
                    value={email}
                    isRequired
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setUserExistsError("");
                      setFirstReqiredFieldsError("");
                      setValidateEmailError("");
                    }}
                  />
                  <Input
                    label="Пароль"
                    isRequired
                    variant="bordered"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibilityPass}
                        aria-label="toggle password visibility"
                      >
                        {isPasswordVisible ? (
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
                    type={isPasswordVisible ? "text" : "password"}
                    className="w-full"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setValidatePasswordError(""); setFirstReqiredFieldsError(""); }}
                  />
                  <Input
                    label="Підтвердіть пароль"
                    isRequired
                    variant="bordered"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibilityConfPass}
                        aria-label="toggle password visibility"
                      >
                        {isConfirmPasswordVisible ? (
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
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    className="w-full"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setConfirmedPasswordError(""); setFirstReqiredFieldsError(""); }}
                  />
                </div>

                {registrationError && (
                  <p className="text-[14px] text-danger">{registrationError}</p>
                )}
                {validatePasswordError && (
                  <p className="text-[14px] text-danger">{validatePasswordError}</p>
                )}
                {validatePhoneError && (
                  <p className="text-[14px] text-danger">{validatePhoneError}</p>
                )}
                {validateEmailError && (
                  <p className="text-[14px] text-danger">{validateEmailError}</p>
                )}
                {userExistsError && (
                  <p className="text-[14px] text-danger">{userExistsError}</p>
                )}
                {confirmedPasswordError && (
                  <p className="text-[14px] text-danger">{confirmedPasswordError}</p>
                )}
                {firstReqiredFieldsError && (
                  <p className="text-[14px] text-danger">{firstReqiredFieldsError}</p>
                )}
                <div className={styles.ButtonContainer}>
                  <Button
                    onClick={firstStepRegistration}
                    variant="flat"
                    className="bg-[#E48100] text-white rounded-[8px]"
                  >
                    Продовжити
                  </Button>
                </div>
              </div>
            )}
            {formStep === 2 && (
              <div className={styles.FormElements}>
                <div className={styles.FieldContainer}>
                  <Input
                    type="text"
                    variant="bordered"
                    label="Прізвище *"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); setSecondReqiredFieldsError("") }}
                  />
                  <Input
                    type="text"
                    variant="bordered"
                    label="Ім'я *"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setSecondReqiredFieldsError("") }}
                  />
                  <Input
                    type="text"
                    variant="bordered"
                    label="По батькові"
                    value={middleName}

                    onChange={(e) => { setMiddleName(e.target.value); setSecondReqiredFieldsError("") }}
                  />
                  <I18nProvider locale="en-GB">
                    <DateInput label="Дата народження *" maxValue={today(getLocalTimeZone())} value={birthDate} onChange={setBirthDate} />
                  </I18nProvider>
                </div>
                {secondReqiredFieldsError && (
                  <p className="text-[14px] text-danger">{secondReqiredFieldsError}</p>
                )}
                <div className={styles.ButtonContainer}>
                  <Button
                    onClick={secondStepRegistration}
                    variant="flat"
                    className="bg-[#E48100] text-white rounded-[8px]"
                  >
                    Продовжити
                  </Button>
                  <Button
                    onClick={handleBackClick}
                    className="bg-[#E48100] text-white rounded-[8px]"
                    variant="flat"
                    startContent={<img src="/AuthPage/undo.svg" alt="Undo" className="w-[25px]" />}
                  >
                    До попереднього кроку
                  </Button>
                </div>
              </div>
            )}
            {formStep === 3 && (
              <div className={styles.FormElements}>
                <CheckboxGroup
                  isRequired
                  isInvalid={isInvalid && isSubmitted}
                  label="Оберіть вашу роль у програми:"
                  value={selectedRoles}
                  onValueChange={(value) => {
                    setIsSubmitted(false);
                    setSelectedRoles(value);
                  }}
                >
                  <Checkbox value="Owner">Я власник</Checkbox>
                  <Checkbox value="User">Я користувач</Checkbox>
                </CheckboxGroup>
                {isSubmitted && isInvalid && (
                  <p className={`text-[14px] text-danger`}>Будь ласка, оберіть хоча б одну роль</p>
                )}
                <div className={styles.ButtonContainer}>
                  <Button
                    onClick={handleEndRegistrationClick}
                    className="bg-[#E48100] text-white rounded-[8px]"
                    variant="flat"
                  >
                    Продовжити
                  </Button>
                  <Button
                    onClick={handleBackClick}
                    className="bg-[#E48100] text-white rounded-[8px]"
                    variant="flat"
                    startContent={<img src="/AuthPage/undo.svg" alt="Undo" className="w-[25px]" />}
                  >
                    До попереднього кроку
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {formStep !== 3 && (
          <div className={styles.LinkWrapper}>
            <p className={styles.LinkText}>Вже маєте аккаунт?</p>
            <Link className={styles.Link} href="/pages/login">Увійти</Link>
          </div>
        )}
      </div>
      <Modal hideCloseButton isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(
            <>
              <ModalHeader className="flex flex-col gap-1">Реєстрація пройшла успішно!</ModalHeader>
              <ModalBody>
                <p>
                  Бажає увійти в систему?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleNoLoginClick}>
                  Ні
                </Button>
                <Button className={`bg-[--fulvous] text-white`} onPress={handleYesLoginClick}>
                  Так
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Reg;
