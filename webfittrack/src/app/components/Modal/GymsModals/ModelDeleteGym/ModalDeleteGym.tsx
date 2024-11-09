"use client";
import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import styles from "./ModalDeleteGym.module.css";
import React, { useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";

interface AppProps {
    gymId: string;
    isOpen: boolean;
    onClose: () => void;
    refreshTable: () => void;
}

export default function App({ gymId, isOpen, onClose, refreshTable }: AppProps) {
    const [loading, setLoading] = useState(false);
    const [requiredFieldsError, setRequiredFieldsError] = useState("");

    const deleteGymProcess = async () => {
        setLoading(true);
        if (await deleteGym()) {
            onClose();
            refreshTable();
            setLoading(false);
        } else {
            setRequiredFieldsError("Сталась помилка при видалені. Спробуйте ще раз.");

            setLoading(false);
            return false;
        }
    };

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

            if (response.status === 204) {
                return true;
            } else if (response.status === 500) {
                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error deleting gym:', error);
            setRequiredFieldsError("Сталась помилка при видалені. Спробуйте ще раз.");

            return false;
        }
    };

    return (
        <>
            {loading ? (
                <div className={styles.LoadingContainer}>
                    <CircularProgress classNames={{ indicator: "stroke-[--fulvous]" }} />
                </div>
            ) : (
                <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
                    <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">Підтвердження</ModalHeader>
                        <ModalBody>
                            <p>Ви впевнені, що хочете видалити спортивний центр?</p>
                            {requiredFieldsError && (
                                <p className="text-[14px] text-danger">{requiredFieldsError}</p>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Закрити
                            </Button>
                            <Button className="bg-[#E48100]" onClick={deleteGymProcess}>
                                Видалити
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
