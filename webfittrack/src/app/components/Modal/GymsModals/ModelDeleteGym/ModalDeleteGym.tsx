
"use client";
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import styles from "./ModalDeleteGym.module.css"
import React, { useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";

interface AppProps {
    gymId: string;
}

export default function App({ gymId }: AppProps) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [requiredFieldsError, setRequiredFieldsError] = useState("");

    const deleteGymProcess = async () => {
        setLoading(true);
        if (await deleteGym()) {
            onClose();
            setLoading(false);
        }
        else {
            setRequiredFieldsError("Сталась помилка при видалені. Спробуйте ще раз.");
            setLoading(false);
            return false;
        }
    }

    const deleteGym = async (): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Gyms/${gymId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                console.error("No response received");
                return false;
            }
            console.log("response.status:", response.status);
            if (response.status === 204) {
                return true;

            } else if (response.status === 500) {
                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error editing gym:', error);
            if (!requiredFieldsError) {
                setRequiredFieldsError('Сталась помилка при видалені. Спробуйте ще раз');
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
                    <Button onPress={onOpen} className="bg-[#E48100] text-white">Видалити</Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="top-center"
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Підтвердження</ModalHeader>
                                    <ModalBody>
                                        {/* <div className={styles.FormElements}>
                                            <div className={styles.FieldContainer}>
                                                <Input
                                                    type="text"
                                                    variant="bordered"
                                                    label="Назва"
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value); }}
                                                />
                                                <Input
                                                    type="text"
                                                    variant="bordered"
                                                    label="Адреса"
                                                    value={address}
                                                    onChange={(e) => { setAddress(e.target.value); }}
                                                />
                                            </div>
                                        </div>
                                        {requiredFieldsError && (
                                            <p className="text-[14px] text-danger">{requiredFieldsError}</p>
                                        )} */}
                                        <p>Ви впевнені що хочете видалити спортивний центр?</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            Закрити
                                        </Button>
                                        <Button className="bg-[#E48100]" onClick={deleteGymProcess} onPress={onClose}>
                                            Видалити
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