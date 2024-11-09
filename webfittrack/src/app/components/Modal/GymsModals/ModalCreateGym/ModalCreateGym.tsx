
"use client";
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import styles from "./ModalCreateGym.module.css"
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";

interface AppProps {
    ownerId: string;  // Додаємо ownerId як пропс
    onGymCreated: () => void;
}

export default function App({ ownerId, onGymCreated }: AppProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [requiredFieldsError, setRequiredFieldsError] = useState("");

    const createGymProcess = async () => {
        setRequiredFieldsError("");
        if (name && address) {
            setRequiredFieldsError("");
        }
        else {
            setRequiredFieldsError("Усі поля є обов'язковими");
            return false;
        }
        const gymData = {
            name,
            address,
            ownerId
        };
        if (await createGym(gymData)) {
            onClose();
            onGymCreated();
        }
        else {
            setRequiredFieldsError("Сталась помилка при створенні. Спробуйте ще раз.");
            return false;
        }
    }

    useEffect(() => {
        setAddress("");
        setName("");
    }, []);

    useEffect(() => {
        setAddress("");
        setName("");
    }, [onOpenChange]);

    const createGym = async (gymData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Gyms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gymData),
            });

            if (!response) {
                console.error("No response received");
                return false;
            }

            if (response.status === 201) {
                return true;

            } else if (response.status === 500) {

                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error adding gym:', error);
            if (!requiredFieldsError) {
                setRequiredFieldsError('Сталась помилка при реєстрації. Спробуйте ще раз');
            }
            return false;
        }
    };
    return (
        <>
            <Button onPress={onOpen} className="bg-[#E48100] text-white">Додати</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={() => {
                    if (isOpen) {
                        setName("");
                        setAddress("");
                        setRequiredFieldsError("");
                    }
                    onOpenChange();
                }}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Створення спортивного центру</ModalHeader>
                            <ModalBody>
                                <div className={styles.FormElements}>
                                    <div className={styles.FieldContainer}>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Назва"
                                            value={name}
                                            onChange={(e) => { setName(e.target.value); /*setRequiredFieldsError("");*/ }}
                                        />
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Адреса"
                                            value={address}
                                            onChange={(e) => { setAddress(e.target.value); /*setRequiredFieldsError("");*/ }}
                                        />
                                    </div>
                                </div>
                                {requiredFieldsError && (
                                    <p className="text-[14px] text-danger">{requiredFieldsError}</p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Закрити
                                </Button>
                                <Button className="bg-[#E48100]" onClick={createGymProcess}>
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