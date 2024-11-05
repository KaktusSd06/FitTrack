import type { NextPage } from "next";
import React, { useState } from "react";
import { Link, Input, Button } from "@nextui-org/react";
import { User } from "@/app/Interfaces/Interfaces";
import styles from "../Login/Login.module.css";

const ResetPassword: NextPage = () => {
    const [formStep, setFormStep] = useState(1)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userExistsError, setUserExistsError] = useState('');
    const [firstReqiredFieldsError, setFirstReqiredFieldsError] = useState('');
    const [secondReqiredFieldsError, setSecondReqiredFieldsError] = useState('');
    const [user, setUser] = useState<User>();
    const [confirmedPasswordError, setConfirmedPasswordError] = useState('');
    const [resetPasswordError, setResetPasswordError] = useState('');

    const toggleVisibilityPass = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleVisibilityConfPass = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const checkExistUser = async (): Promise<boolean | undefined> => {
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
                setUser(data);
                return true;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return false;
        }
    };

    const firstStepResetPassword = async () => {
        if (email) {
            setFirstReqiredFieldsError("");
        }
        else {
            setFirstReqiredFieldsError("Введіть електронну адресу");
            return;
        }
        const userExists = await checkExistUser();
        if (userExists) {
            setUserExistsError("");
        } else {
            setUserExistsError("Користувача з такою електронною адресою не існує");
            return;
        }
        handleContinueClick();
    };

    const secondStepResetPassowrd = async () => {
        if (password && confirmPassword) {
            setSecondReqiredFieldsError("");
        }
        else {
            setSecondReqiredFieldsError("Введіть пароль");
            return;
        }
        if (password === confirmPassword) {
            setConfirmedPasswordError("");
        }
        else {
            setSecondReqiredFieldsError("Паролі не співпадають");
            return;
        }
        if (await resetPassword()) {
            setResetPasswordError("");
        }
        else {
            setResetPasswordError("Сталась помилка при змінені паролю. Спробуйте ще раз")
            return;
        }

    }

    const resetPassword = async (): Promise<boolean | undefined> => {
        const idUser = user.id;
        try {
            const response = await fetch(`/api/proxy/Account/update-password/${idUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(password)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.status === 204;

        } catch (error) {
            console.error('Error PUT data', error);
            return false;
        }
    }

    const handleContinueClick = () => setFormStep(formStep + 1);
    // const handleBackClick = () => setFormStep(formStep - 1);

    return (
        <div className={styles.Container}>
            <div className={styles.ContainerWrapper}>
                <div className={styles.MainContainer}>
                    <div className={styles.LogoContainer}>
                        <img className={styles.Logo} src="/Logo.svg"></img>
                        <p className={styles.LogoText}>FitTrack</p>
                    </div>
                    <div className={styles.FormElements}>
                        {formStep === 1 && (
                            <div className={styles.FormElements}>
                                <div className={styles.FieldContainer}>
                                    <Input
                                        type="email"
                                        variant="bordered"
                                        label="Електронна адреса"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setUserExistsError("");
                                            setFirstReqiredFieldsError("");
                                        }}
                                    />
                                </div>
                                {userExistsError && (
                                    <p className="text-[14px] text-danger">{userExistsError}</p>
                                )}
                                {firstReqiredFieldsError && (
                                    <p className="text-[14px] text-danger">{firstReqiredFieldsError}</p>
                                )}
                                <div className={styles.ButtonContainer}>
                                    <Button
                                        onClick={firstStepResetPassword}
                                        variant="flat"
                                        className={`bg-[#E48100] text-white rounded-[8px]`}
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
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setConfirmedPasswordError("");
                                            setSecondReqiredFieldsError("");
                                        }}
                                        label="Пароль"
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
                                    />
                                    <Input
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setConfirmedPasswordError("");
                                            setSecondReqiredFieldsError("");
                                        }}
                                        label="Підтвердіть пароль"
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
                                    />
                                </div>
                                {secondReqiredFieldsError && (
                                    <p className="text-[14px] text-danger">{firstReqiredFieldsError}</p>
                                )}
                                {confirmedPasswordError && (
                                    <p className="text-[14px] text-danger">{confirmedPasswordError}</p>
                                )}
                                {resetPasswordError && (
                                    <p className="text-[14px] text-danger">{resetPasswordError}</p>
                                )}
                                <div className={styles.ButtonContainer}>
                                    <Button
                                        onClick={secondStepResetPassowrd}
                                        variant="flat"
                                        className={`bg-[#E48100] text-white rounded-[8px]`}
                                    >
                                        Відновити
                                    </Button>
                                    {/* <Button
                                        onClick={handleBackClick}
                                        className="bg-[#E48100] text-white rounded-[8px]"
                                        variant="flat"
                                        startContent={<img src="/AuthPage/undo.svg" alt="Undo" className="w-[25px]" />}
                                    >
                                        До попереднього кроку
                                    </Button> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.LinkWrapper}>
                    <p className={styles.LinkText}>Не маєте аккаунту?</p>
                    <Link className={styles.Link}>Зареєструватись</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;