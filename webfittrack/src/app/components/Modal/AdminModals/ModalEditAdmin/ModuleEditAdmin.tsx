"use client";
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, DateInput } from "@nextui-org/react";
import styles from "./ModuleEditAdmin.module.css"
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import { I18nProvider } from "@react-aria/i18n";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import validator from "validator";
interface AppProps {
    adminId: string;
    isOpen: boolean;
    onClose: () => void;
    refreshTable: () => void;
}

export interface Admin {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    gymId?: number;
}
export default function App({ adminId, isOpen, onClose, refreshTable }: AppProps) {
    const [lastAdmin, setLastAdmin] = useState<Admin>();
    const [plainPhoneNumber, setPlainPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [isBasicInfoEdited, setIsBasicInfoEdited] = useState(false);
    const [isPassowordEdited, setIsPasswordEdited] = useState(false);
    const [isPhoneEdited, setIsPhoneEdited] = useState(false);
    const [isEmailEdited, setIsEmailEdited] = useState(false);
    const [birthDate, setBirthDate] = useState<DateValue | null>(null);
    const [userExistsError, setUserExistsError] = useState('');
    const [requiredFieldsError, setRequiredFieldsError] = useState("");
    const toggleVisibilityPass = () => setIsPasswordVisible(!isPasswordVisible);
    const [validateEmailError, setValidateEmailError] = useState('');
    const [validatePhoneError, setValidatePhoneError] = useState('');
    const [validatePasswordError, setValidatePasswordError] = useState('');

    const checkFields = () => {
        return email && password && plainPhoneNumber && firstName && lastName;
    }

    useEffect(() => {
        if (isOpen) {
            startEdit();
        }
    }, [isOpen]);

    const startEdit = async () => {
        const data = await getAdmin();
        if (data) {
            setLastAdmin(data);
            setEmail(data.email);
            setPassword(data.password);
            setPhone(data.phoneNumber);
            setBirthDate(data.birthDate);
            setFirstName(data.firstName);
            setLastName(data.name);
            setMiddleName(data.middleName);
            setUserExistsError("");
            setRequiredFieldsError("");
        }
    };

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

    const getAdmin = async () => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Admins/${adminId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                console.error("No response received");
                return false;
            }

            if (response.status === 200) {
                return response.json();
            } else if (response.status === 500) {
                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error getting admin:', error);
            return false;
        }
    };

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

    const editingProcess = async () => {
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

        if (lastAdmin && password != lastAdmin.password) {
            const updatePasswordData = {
                password
            }
            if (await editAdminPassword(updatePasswordData)) {
                setIsPasswordEdited(true);
            } else {
                setRequiredFieldsError("Сталась помилка при редагуванні паролю. Спробуйте ще раз.");
                setLoading(false);
                editErrorCase();
                return false;
            }
        }
        if (lastAdmin && lastAdmin.email != email) {
            const updateEmailData = {
                email
            }
            if (await editAdminEmail(updateEmailData)) {
                setIsEmailEdited(true);
            } else {
                setRequiredFieldsError("Сталась помилка при редагуванні електронної адреси. Спробуйте ще раз.");
                editErrorCase();
                setLoading(false);
                return false;
            }
        }
        if (lastAdmin && lastAdmin.phoneNumber != plainPhoneNumber) {
            const updatePhoneData = {
                plainPhoneNumber,
            }
            if (await editAdminPhone(updatePhoneData)) {
                setIsPhoneEdited(true);
            } else {
                setRequiredFieldsError("Сталась помилка при редагуванні номеру телефону. Спробуйте ще раз.");
                editErrorCase();
                setLoading(false);
                return false;
            }
        }
        const updateBasicInfoData = {
            firstName,
            lastName,
            middleName,
        }

        if (await editAdminBasicInfo(updateBasicInfoData)) {
            setIsBasicInfoEdited(true);
            setLoading(false);
            refreshTable();
            onClose();
        } else {
            setRequiredFieldsError("Сталась помилка при редагуванні інформації. Спробуйте ще раз.");
            editErrorCase();
            setLoading(false);
            return false;
        }
    };

    const editErrorCase = async () => {
        if (isPassowordEdited && lastAdmin) {
            const updatePasswordData = {
                password: lastAdmin.password
            }
            if (await editAdminPassword(updatePasswordData)) {
                setIsPasswordEdited(false);
            } else {
                setRequiredFieldsError("Сталась помилка при редагуванні паролю. Спробуйте ще раз.");
            }
        }
        if (isEmailEdited && lastAdmin) {
            const updateEmailData = {
                email: lastAdmin.email
            }
            if (await editAdminEmail(updateEmailData)) {
                setIsEmailEdited(false);
            } else {
                setRequiredFieldsError("Сталась помилка при редагуванні електронної пошти. Спробуйте ще раз.");
            }
        }
        if (lastAdmin && isPhoneEdited) {
            const updatePhoneData = {
                phoneNumber: lastAdmin.phoneNumber
            }
            if (await editAdminPhone(updatePhoneData)) {
                setIsPhoneEdited(false);
            } else {
                setRequiredFieldsError("Сталась помилка при редагуванні номеру телефону. Спробуйте ще раз.");
            }
        }
        if (isBasicInfoEdited && lastAdmin) {
            const updateBasicInfoData = {
                firstName: lastAdmin?.firstName,
                lastName: lastAdmin?.lastName,
                middleName: lastAdmin?.middleName,
            }

            if (await editAdminBasicInfo(updateBasicInfoData)) {
                setIsBasicInfoEdited(false);
            } else {
                setRequiredFieldsError("Сталась помилка при редагуванні інформації. Спробуйте ще раз.");

            }
        }
        setLoading(false);
    }

    const editAdminEmail = async (updateData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Account/update-email/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response) {
                console.error("No response received");
                return false;
            }
            if (response.status === 201 || response.status === 204) {
                return true;
            } else if (response.status === 500) {
                return false;
            }

        } catch (error) {
            console.error('Error editing admin:', error);
            return false;
        }
    };
    const editAdminPhone = async (updateData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Account/update-phone/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response) {
                console.error("No response received");
                return false;
            }
            if (response.status === 201 || response.status === 204) {
                return true;
            } else if (response.status === 500) {
                return false;
            }

        } catch (error) {
            console.error('Error editing admin:', error);
            return false;
        }
    };
    const editAdminPassword = async (updateData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Account/update-password/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response) {
                console.error("No response received");
                return false;
            }
            if (response.status === 201 || response.status === 204) {
                return true;
            } else if (response.status === 500) {
                return false;
            }

        } catch (error) {
            console.error('Error editing admin:', error);
            return false;
        }
    };

    const editAdminBasicInfo = async (updateData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Admins/update-basic-info/${adminId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response) {
                console.error("No response received");
                return false;
            }
            if (response.status === 201 || response.status === 204) {
                return true;
            } else if (response.status === 500) {
                return false;
            }

        } catch (error) {
            console.error('Error editing admin:', error);

            return false;
        }
    };


    const formatDate = (date: DateValue | null): string => {
        if (!date) return "";

        const jsDate = date.toDate("UTC");
        const day = String(jsDate.getDate()).padStart(2, "0");
        const month = String(jsDate.getMonth() + 1).padStart(2, "0");
        const year = jsDate.getFullYear();

        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={(open) => !open && onClose()}
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
                                            value={lastName}
                                            onChange={(e) => { setLastName(e.target.value); setRequiredFieldsError("") }}
                                            disabled={loading}
                                        />
                                        <Input
                                            isRequired
                                            type="text"
                                            variant="bordered"
                                            label="Ім'я "
                                            value={firstName}
                                            onChange={(e) => { setFirstName(e.target.value); setRequiredFieldsError("") }}
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
                                        <I18nProvider locale="en-GB">
                                            <DateInput
                                                isRequired
                                                label="Дата народження"
                                                maxValue={today(getLocalTimeZone())}
                                                value={birthDate}
                                                onChange={setBirthDate}
                                                isDisabled={loading}
                                            />
                                        </I18nProvider>
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
                                <Button className="bg-[#E48100]" onClick={editingProcess} disabled={loading}>
                                    Редагувати
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
