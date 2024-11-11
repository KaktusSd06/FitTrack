
"use client";
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import styles from "./ModalCreateMeal.module.css"
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";

interface AppProps {
    userId: string;
    onMealCreated: () => void;
}

export default function App({ userId, onMealCreated }: AppProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [kcal, setKcal] = useState<Number>(0);
    const [requiredFieldsError, setRequiredFieldsError] = useState("");

    const createGymProcess = async () => {
        setRequiredFieldsError("");
        if (name && kcal) {
            setRequiredFieldsError("");
        }
        else {
            setRequiredFieldsError("Усі поля є обов'язковими");
            return false;
        }
        const mealData = {
            name,
            dateOfConsumption: new Date().toISOString(),
            userId,
            calories: kcal,
        };
        console.log(mealData)
        if (await createMeal(mealData)) {
            onClose();
            onMealCreated();
        }
        else {
            setRequiredFieldsError("Сталась помилка при створенні. Спробуйте ще раз.");
            return false;
        }
    }

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        setKcal(0);
        setName("");
    }, []);

    useEffect(() => {
        setKcal(0);
        setName("");
    }, [onOpenChange]);

    const createMeal = async (mealData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Meals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mealData),
            });

            if (!response) {
                console.error("No response received");
                return false;
            }

            if (response.status === 201) {
                return true;

            }
            else {
                console.log(response.json());
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error adding meal:', error);
            if (!requiredFieldsError) {
                setRequiredFieldsError('Сталась помилка при створенні. Спробуйте ще раз');
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
                        setKcal(0);
                        setRequiredFieldsError("");
                    }
                    onOpenChange();
                }}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Додавання страви</ModalHeader>
                            <ModalBody>
                                <div className={styles.FormElements}>
                                    <div className={styles.FieldContainer}>
                                        <Input
                                            type="text"
                                            variant="bordered"
                                            label="Назва"
                                            value={name}
                                            onChange={(e) => { setName(e.target.value); setRequiredFieldsError(""); }}
                                        />
                                        <Input

                                            type="Number"
                                            placeholder="00"
                                            variant="bordered"
                                            value={kcal.toString()}
                                            onChange={(e) => {
                                                setKcal(Number(e.target.value));
                                                setRequiredFieldsError("");
                                            }}
                                            className={styles.input}
                                            endContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">ккал</span>
                                                </div>
                                            }
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