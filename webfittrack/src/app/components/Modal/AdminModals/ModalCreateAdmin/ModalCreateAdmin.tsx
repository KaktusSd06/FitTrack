"use client";
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import styles from "./ModalCreateAdmin.module.css"
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import validator from "validator";


interface AppProps {
    gymId: string;
    onAdminCreated: () => void;
}

export default function App({ gymId, onAdminCreated }: AppProps) {

    const [plainPhoneNumber, setPlainPhoneNumber] = useState("");
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [userExistsError, setUserExistsError] = useState('');
    const [requiredFieldsError, setRequiredFieldsError] = useState("");
    const toggleVisibilityPass = () => setIsPasswordVisible(!isPasswordVisible);
    const [adminId, setAdminId] = useState("");
    const [validateEmailError, setValidateEmailError] = useState('');
    const [validatePhoneError, setValidatePhoneError] = useState('');
    const [validatePasswordError, setValidatePasswordError] = useState('');


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
        setRequiredFieldsError("");
        setValidatePhoneError("");
    };

    const getPlainPhoneNumber = (phone: string) => {
        return phone.replace(/\D/g, ''); // Видаляє всі нечислові символи
    };

    const setEmptyFields = () => {
        setEmail("");
        setPassword("");
        setPhone("");
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setUserExistsError("");
        setRequiredFieldsError("");
    }

    const checkFields = () => {
        return email && password && phone && firstName && lastName;
    }

    useEffect(() => {
        setEmptyFields()
    }, []);

    useEffect(() => {
        setEmptyFields()
    }, [onOpenChange]);

    const checkExistUser = async (): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Admin/get-by-email/${email}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response) {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.status === 200;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return false;
        }
    };


    const creationProcess = async () => {
        setLoading(true);
        if (!checkFields()) {
            setRequiredFieldsError("Заповніть обов'язкові поля");
            setLoading(false);
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

        const userExists = await checkExistUser();
        if (userExists) {
            setUserExistsError("Користувач з такою електронною адресою вже існує");
            setLoading(false);
            return;
        } else {
            setUserExistsError("");
        }


        const intGymId = parseInt(gymId);
        const adminData = {
            email: email,
            phoneNumber: plainPhoneNumber,
            password: password,
            confirmedPassword: password,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            gymId: intGymId,
        };
        if (await createAdmin(adminData)) {
            await getAdmin();
            const assignRoleData = { userEmail: email, role: "Admin" };
            await setRoleToUser(assignRoleData);

            onClose();
            onAdminCreated();
        } else {
            console.log(adminData);
            setRequiredFieldsError("Сталась помилка при створенні. Спробуйте ще раз.");
        }
        setLoading(false);
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

    const createAdmin = async (adminData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Admins`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(adminData),
            });

            if (!response) {
                console.error("No response received");
                return false;
            }

            let responseBody: unknown = null;
            try {
                responseBody = await response.json();
            } catch (jsonError) {
                console.error("Failed to parse JSON response:", jsonError);
            }

            if (typeof responseBody === 'object' && responseBody !== null) {
                console.log("Response body:", responseBody);
            } else {
                console.error("Response body is not an object:", responseBody);
            }


            if (response.status === 201) {
                return true;
            } else if (response.status === 500) {
                setUserExistsError('Користувач з таким номером телефону вже існує');
                console.log("Response body:", responseBody);
                return false;
            } else {
                console.log("Response body:", responseBody);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error creating Admin:', error);
            setRequiredFieldsError('Сталась помилка при створенні. Спробуйте ще раз');
            return false;
        }
    };


    const getAdmin = async (): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`/api/proxy/Admins/get-by-email/${email}`, {
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
                setAdminId(data.id);
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
            return false;
        }
    };



    return (
        <>
            <Button onPress={onOpen} className="bg-[#E48100] text-white">Додати</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={() => {
                    if (isOpen) setEmptyFields();
                    onOpenChange();
                }}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Створення адміністрації</ModalHeader>
                            <ModalBody>
                                {loading && (
                                    <div className={styles.loadingOverlay}>
                                        <CircularProgress size="lg" />
                                    </div>
                                )}
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
                                            isRequired
                                            type="email"
                                            variant="bordered"
                                            label="Електронна адреса"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setUserExistsError(""); setRequiredFieldsError("") }}
                                            disabled={loading}
                                        />
                                        <Input
                                            isRequired
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
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); setRequiredFieldsError("") }}
                                            disabled={loading}
                                        />
                                        <Input
                                            isRequired
                                            type="text"
                                            variant="bordered"
                                            label="Прізвище "
                                            value={firstName}
                                            onChange={(e) => { setFirstName(e.target.value); setRequiredFieldsError("") }}
                                            disabled={loading}
                                        />
                                        <Input
                                            isRequired
                                            type="text"
                                            variant="bordered"
                                            label="Ім'я "
                                            value={lastName}
                                            onChange={(e) => { setLastName(e.target.value); setRequiredFieldsError("") }}
                                            disabled={loading}
                                        />
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="По батькові"
                                            value={middleName}
                                            onChange={(e) => { setMiddleName(e.target.value); }}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                {validatePasswordError && (
                                    <p className="text-[14px] text-danger">{validatePasswordError}</p>
                                )}
                                {validatePhoneError && (
                                    <p className="text-[14px] text-danger">{validatePhoneError}</p>
                                )}
                                {validateEmailError && (
                                    <p className="text-[14px] text-danger">{validateEmailError}</p>
                                )}
                                {requiredFieldsError && (
                                    <p className="text-[14px] text-danger">{requiredFieldsError}</p>
                                )}
                                {userExistsError && (
                                    <p className="text-[14px] text-danger">{userExistsError}</p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose} disabled={loading}>
                                    Закрити
                                </Button>
                                <Button className="bg-[#E48100]" onClick={creationProcess} disabled={loading}>
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
