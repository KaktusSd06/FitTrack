
"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import styles from "./ModlaCreateService.module.css"
import React, { useState, useEffect } from "react";

// Utility function to format date

interface ModalProps {
    gymId: number;
    isopen: boolean;
    onClose: () => void;
}

export const ModalCreateService = ({ gymId, isopen, onClose }: ModalProps): JSX.Element => {

    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [cost, setcost] = useState(1);
    const [ReqiredFieldsError, setReqiredFieldsError] = useState('');
    const [CreationError, setCreationError] = useState('');

    const CreateTraining = async (CreationData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`/api/proxy/Services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(CreationData),
            });
            if (response.status === 201) {
                console.log("201");
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
            name,
            cost,
            gymId,
        };
        console.log(CreationData);
        if (name && description) {
            setReqiredFieldsError("");
        }
        else {
            setReqiredFieldsError("Заповніть обов'язкові поля");
            return;
        }
        await CreateTraining(CreationData);
        onclose
    };


    useEffect(() => {
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
                            <ModalHeader className="flex flex-col gap-1">Створення послуги</ModalHeader>
                            <ModalBody>
                                <div className={styles.FormElements}>
                                    <div className={styles.FieldContainer}>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Назва"
                                            value={name}
                                            onChange={(e) => { setname(e.target.value); setCreationError("") }}
                                        />
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Опис"
                                            value={description}
                                            onChange={(e) => { setdescription(e.target.value); setCreationError("") }}
                                        />
                                        <Input
                                            type="number"
                                            variant="bordered"
                                            label="Ціна"
                                            value={cost.toString()}
                                            onChange={(e) => { setcost(parseInt(e.target.value, 10)); setCreationError(""); }}
                                        />
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