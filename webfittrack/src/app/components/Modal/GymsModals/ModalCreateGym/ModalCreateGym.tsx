
"use client";
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import styles from "./ModalCreateGym.module.css"
import React, { useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";

interface AppProps {
    ownerId: string;  // Додаємо ownerId як пропс
}

export default function App({ ownerId }: AppProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        if (await createGym(gymData)) {
            onClose();
        }
        else {
            setRequiredFieldsError("Сталась помилка при створенні. Спробуйте ще раз.");
            return false;
        }
        setLoading(false);
    }

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
            {loading ? ( // Якщо loading true, показуємо CircularProgress
                <div className={styles.LoadingContainer} >
                    <CircularProgress classNames={{
                        // svg: "w-36 h-36 drop-shadow-md",
                        indicator: "stroke-[--fulvous]",
                        // track: "bg-black",
                        // value: "text-3xl font-semibold text-white",
                    }} />
                </div>
            ) : (
                <>
                    <Button onPress={onOpen} className="bg-[#E48100] text-white">Додати</Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
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
                                        <Button className="bg-[#E48100]" onClick={createGymProcess} onPress={onClose}>
                                            Створити
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
}