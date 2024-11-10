
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import styles from "./ModalCreateTrainer.module.css"
import React, { useState } from "react";

interface ModalProps {
    gymId: number;
    isopen: boolean;
    onClose: () => void;
}

export const ModalCreateTrainer = ({ gymId, isopen, onClose }: ModalProps): JSX.Element => {

    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [userExistsError, setUserExistsError] = useState('');
    const [confirmedPasswordError, setConfirmedPasswordError] = useState('');
    const [firstReqiredFieldsError, setFirstReqiredFieldsError] = useState('');
    const [secondReqiredFieldsError, setSecondReqiredFieldsError] = useState('');
    const [registrationError, setRegistrationError] = useState('');



    const registerUser = async (registrationData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`/api/proxy/Trainers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.status === 201) {
                return true;
            } else if (response.status === 500) {
                setRegistrationError('Користувач з таким номером телефону вже існує');

                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error registering user:', error);
            if (!registrationError) {
                setRegistrationError('Сталась помилка при реєстрації. Спробуйте ще раз');
            }
            return false;
        }
    };

    const registration = async () => {
        setRegistrationError('');
        const registrationData = {
            email,
            phoneNumber: phone,
            password,
            confirmedPassword: confirmPassword,
            firstName,
            lastName,
            middleName,
            gymId,
        };
        if (email && phone && password && confirmPassword) {
            setFirstReqiredFieldsError("");
        }
        else {
            setFirstReqiredFieldsError("Заповніть обов'язкові поля");
            return;
        }
        const userExists = await checkExistUser();
        if (userExists) {
            setUserExistsError("Користувач з такою електронною адресою вже існує");
            return;
        } else {
            setUserExistsError("");
        }
        if (checkConfitmedPassword()) {
            setConfirmedPasswordError("");
        }
        else {
            setConfirmedPasswordError("Паролі не співпадають");
            return;
        }
        const isRegistered = await registerUser(registrationData);

        if (isRegistered) {
            const assignRoleData = { userEmail: email, role: "Trainer" };
            await setRoleToUser(assignRoleData);

        }
        onclose
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
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.status === 200;

        } catch (error) {
            console.error('Error fetching user data:', error);
            return false;
        }
    };

    const checkConfitmedPassword = () => {
        return password === confirmPassword;
    }





    return (
        <>

            <Modal
                isOpen={isopen}
                onClose={onClose}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Створення тренера</ModalHeader>
                            <ModalBody>
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
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Номер телефону *"
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value); setFirstReqiredFieldsError(""); setRegistrationError("") }}
                                        />
                                        <Input
                                            type="email"
                                            variant="bordered"
                                            label="Електронна адреса *"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setUserExistsError("");
                                                setFirstReqiredFieldsError("");
                                            }}
                                        />
                                        <Input
                                            label="Пароль *"
                                            variant="bordered"
                                            className="w-full"
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); setConfirmedPasswordError(""); setFirstReqiredFieldsError(""); }}
                                        />
                                        <Input
                                            label="Підтвердіть пароль *"
                                            variant="bordered"
                                            className="w-full"
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value); setConfirmedPasswordError(""); setFirstReqiredFieldsError(""); }}
                                        />
                                    </div>
                                </div>
                                {registrationError && (
                                    <p className="text-[14px] text-danger">{registrationError}</p>
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
                                {secondReqiredFieldsError && (
                                    <p className="text-[14px] text-danger">{secondReqiredFieldsError}</p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Закрити
                                </Button>
                                <Button className="bg-[#E48100]" onClick={registration} onPress={onClose}>
                                    Створити
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}