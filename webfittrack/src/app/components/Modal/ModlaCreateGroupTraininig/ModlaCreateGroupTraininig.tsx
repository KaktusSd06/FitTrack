
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import styles from "./ModlaCreateGroupTraininig.module.css"
import React, { useState, useEffect } from "react";
import { Gym, Trainer } from "@/app/Interfaces/Interfaces";
import { DateInput } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { DateValue } from "@internationalized/date";

interface ModalProps {
    gymId: number;
    isopen: boolean;
    onClose: () => void;
}

export const ModlaCreateGroupTraininig = ({ gymId, isopen, onClose }: ModalProps): JSX.Element => {

    const [contactPhone, setcontactPhone] = useState("");
    const [description, setdescription] = useState("");
    const [date, setdate] = useState<DateValue | null>(null);
    const [durationInMinutes, setdurationInMinutes] = useState(1);
    const [trainers, settrainers] = useState<Trainer[] | undefined>([]);
    const [trainerId, settrainerId] = useState('');
    const [ReqiredFieldsError, setReqiredFieldsError] = useState('');
    const [CreationError, setCreationError] = useState('');



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
        const CreationData = {
            description,
            contactPhone,
            date,
            durationInMinutes,
            trainerId,
            gymId,
        };
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
            const response = await fetch(`/api/proxy/Gyms/4`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const gym: Gym = response.json();
            settrainers(gym.trainers);
            return gym.trainers;

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
                                            <DateInput
                                                label="Початок"
                                                value={date}
                                                onChange={setdate}
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
                                                        ? trainers?.find((trainer) => trainer.id === trainerId)?.firstName + " " +
                                                        trainers?.find((trainer) => trainer.id === trainerId)?.lastName
                                                        : "Виберіть тренера"}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Виберіть тренера"
                                                onSelectionChange={(key) => settrainerId(key as string)}
                                            >
                                                {(trainers || []).map((trainer) => (
                                                    <DropdownItem key={trainer.id} value={trainer.id.toString()}>
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