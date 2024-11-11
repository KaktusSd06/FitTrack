
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import styles from "./ModlaEditGroupTraininig.module.css"
import React, { useState, useEffect } from "react";
import { GroupTraining, Trainer } from "@/app/Interfaces/Interfaces";
import { I18nProvider } from "@react-aria/i18n";
import { now } from "@internationalized/date";

// Utility function to format date

interface ModalProps {
    id: number
    gymId: number;
    isopen: boolean;
    onClose: () => void;
}

export const ModlaEditGroupTraininig = ({ id, gymId, isopen, onClose }: ModalProps): JSX.Element => {
    const [lasttraining, setlasttraining] = useState<GroupTraining>();
    const [contactPhone, setcontactPhone] = useState("");
    const [description, setdescription] = useState("");
    const [date, setdate] = useState<string>("");
    const [durationInMinutes, setdurationInMinutes] = useState(1);
    const [trainers, settrainers] = useState<Trainer[] | undefined>([]);
    const [trainerId, setTrainerId] = useState('');
    const [ReqiredFieldsError, setReqiredFieldsError] = useState('');
    const [CreationError, setCreationError] = useState('');

    const formatDateToISO = (dateString: string): string => {
        const jsDate = new Date(dateString);
        return jsDate.toISOString().slice(0, 20); // Trims to 'YYYY-MM-DDTHH:mm:ss'
    };
    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setdate(value);
    };
    const startEdit = async () => {
        const data = await getTraining();
        if (data) {
            setlasttraining(data);
            setdescription(data.description);
            setdurationInMinutes(data.password);
            setcontactPhone(data.phoneNumber);
            setTrainerId(data.birthDate);
            console.log(data)
        }
    };

    const getTraining = async () => {
        try {
            const response = await fetch(`/api/proxy/GroupTrainings/${id}`, {
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
    const CreateTraining = async (CreationData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {

            const response = await fetch(`/api/proxy/GroupTrainings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(CreationData),
            });
            if (response.status === 201) {
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
            contactPhone,
            date: formatteddate,
            durationInMinutes,
            trainerId,
            gymId,
        };

        console.log(JSON.stringify(CreationData));
        if (date && durationInMinutes && contactPhone) {
            setReqiredFieldsError("");
        }
        else {
            setReqiredFieldsError("Заповніть обов'язкові поля");
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
        if (isopen) {
            startEdit();
        }
    }, [gymId, isopen]);
    return (
        <>

            <Modal
                isOpen={isopen}
                onOpenChange={(open) => !open && onClose()}
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
                                            label="Опис"
                                            value={description}
                                            onChange={(e) => { setdescription(e.target.value); setCreationError("") }}
                                        />
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Контактний телефон"
                                            value={contactPhone}
                                            onChange={(e) => { setcontactPhone(e.target.value); setCreationError("") }}
                                        />
                                        <I18nProvider locale="en-GB">

                                            <Input

                                                type="datetime-local" // Allows both date and time input
                                                value={date}
                                                placeholder="Дата і час"
                                                onChange={handleDateTimeChange}
                                            />
                                        </I18nProvider>
                                        <Input
                                            type="number"
                                            variant="bordered"
                                            label="Час в хвилинах *"
                                            value={durationInMinutes}
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