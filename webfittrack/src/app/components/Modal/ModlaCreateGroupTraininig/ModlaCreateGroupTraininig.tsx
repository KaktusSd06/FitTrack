
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import styles from "./ModlaCreateGroupTraininig.module.css"
import React, { useState, useEffect } from "react";
import { Trainer } from "@/app/Interfaces/Interfaces";
import { I18nProvider } from "@react-aria/i18n";
import { now } from "@internationalized/date";
import validator from "validator";

// Utility function to format date

interface ModalProps {
    gymId: number;
    isopen: boolean;
    onClose: () => void;
}

export const ModlaCreateGroupTraininig = ({ gymId, isopen, onClose }: ModalProps): JSX.Element => {
    const [plainPhoneNumber, setPlainPhoneNumber] = useState("");
    const [phone, setPhone] = useState("");

    const [description, setdescription] = useState("");
    const [date, setdate] = useState<string>("");
    const [durationInMinutes, setdurationInMinutes] = useState(1);
    const [trainers, settrainers] = useState<Trainer[] | undefined>([]);
    const [trainerId, setTrainerId] = useState('');
    const [ReqiredFieldsError, setReqiredFieldsError] = useState('');
    const [CreationError, setCreationError] = useState('');
    const [validatePhoneError, setValidatePhoneError] = useState('');

    const formatDateToISO = (dateString: string): string => {
        const jsDate = new Date(dateString);
        return jsDate.toISOString().slice(0, 20); // Trims to 'YYYY-MM-DDTHH:mm:ss'
    };
    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setdate(value);
    };
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
        setReqiredFieldsError("");
        setValidatePhoneError("");
    };
    const getPlainPhoneNumber = (phone: string) => {
        return phone.replace(/\D/g, ''); // Видаляє всі нечислові символи
    };
    const CreateTraining = async (CreationData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`/api/proxy/GroupTrainings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(CreationData),
            });
            if (response.status === 201) {
                console.log(CreationData);
                console.log(201);
                return true;
            } else if (response.status === 500) {
                setCreationError('помилка на сервері');

                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Помилка:', error);
            if (!CreationError) {
                setCreationError('Сталась помилка при реєстрації. Спробуйте ще раз');
            }
            return false;
        }
    };

    const registration = async () => {
        setCreationError('');
        let formatteddate: string;
        if (date)
            formatteddate = formatDateToISO(date);
        else
            formatteddate = now("UTC").toString();
        const CreationData = {
            description,
            contactPhone: plainPhoneNumber,
            date: formatteddate,
            durationInMinutes,
            trainerId,
            gymId: gymId,
        };
        console.log(CreationData);
        if (date && durationInMinutes && phone) {
            setReqiredFieldsError("");
        }
        else {
            setReqiredFieldsError("Заповніть обов'язкові поля");
            return;
        }
        console.log(plainPhoneNumber);
        if (!validatePhoneNumber()) {
            setValidatePhoneError("Введіть коректний номер телефону");
            return;
        }
        await CreateTraining(CreationData);
        onclose
    };

    const GetAllTrainers = async (): Promise<Trainer[] | undefined> => {
        try {
            const response = await fetch(`/api/proxy/Gyms/get-trainers/${gymId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            settrainers(await response.json());
            console.log(trainers);
            return trainers;

        } catch (error) {
            return [];
        }
    };
    useEffect(() => {
        GetAllTrainers();
    }, [gymId]);
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
                            <ModalHeader className="flex flex-col gap-1">Створення групвих треувань</ModalHeader>
                            <ModalBody>
                                <div className={styles.FormElements}>
                                    <div className={styles.FieldContainer}>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Опис"
                                            value={description}
                                            onChange={(e) => { setdescription(e.target.value); setCreationError("") }}
                                        />
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Контактний телефон"
                                            isRequired
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className=" text-small">+38</span>
                                                </div>
                                            }
                                            onChange={handlePhoneChange}
                                        />
                                        <I18nProvider locale="en-GB">

                                            <Input
                                                label="Дата і час"
                                                type="datetime-local" // Allows both date and time input
                                                value={date}
                                                onChange={handleDateTimeChange}
                                            />
                                        </I18nProvider>
                                        <Input
                                            type="number"
                                            variant="bordered"
                                            label="Час в хвилинах *"
                                            value={durationInMinutes.toString()}
                                            onChange={(e) => { setdurationInMinutes(parseInt(e.target.value, 10)); setCreationError(""); }}
                                        />
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button variant="flat">
                                                    {trainerId
                                                        ? (trainers?.find((trainer) => trainer.id === trainerId)?.firstName)?.toString() + " " +
                                                        (trainers?.find((trainer) => trainer.id === trainerId)?.lastName)?.toString()
                                                        : "Виберіть тренера"}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Виберіть тренера"
                                                onSelectionChange={(key) => { console.log(key); setTrainerId(key as string); }} // Ensure you're using the correct setter function
                                            >
                                                {(trainers || []).map((trainer) => (
                                                    <DropdownItem
                                                        onClick={() => setTrainerId(trainer.id)}  // Pass a function to handle the click event
                                                        key={trainer.id}
                                                        value={trainer.id.toString()}
                                                        textValue={trainer.firstName + " " + trainer.lastName}
                                                    >
                                                        {trainer.firstName} {trainer.lastName}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>


                                    </div>
                                </div>
                                {CreationError && (
                                    <p className="text-[14px] text-danger">{CreationError}</p>
                                )}
                                {ReqiredFieldsError && (
                                    <p className="text-[14px] text-danger">{ReqiredFieldsError}</p>
                                )}{validatePhoneError && (
                                    <p className="text-[14px] text-danger">{validatePhoneError}</p>
                                )}

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Закрити
                                </Button>
                                <Button className="bg-[#E48100]" onClick={registration} >
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