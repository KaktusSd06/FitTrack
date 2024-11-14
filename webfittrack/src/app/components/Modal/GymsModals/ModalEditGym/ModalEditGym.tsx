import { CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import styles from "./ModalEditGym.module.css";
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";

interface AppProps {
    gymId: string;
    ownerId: string;
    isOpen: boolean;
    onClose: () => void;
    refreshTable: () => void;
}

export default function ModalEditGym({ gymId, ownerId, isOpen, onClose, refreshTable }: AppProps) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [requiredFieldsError, setRequiredFieldsError] = useState("");


    useEffect(() => {
        if (isOpen) {
            startEdit();
        }
    }, [isOpen]);

    const startEdit = async () => {
        const data = await getGym();

        if (data) {
            setName(data.name);
            setAddress(data.address);
        }

    };


    const getGym = async () => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Gyms/${gymId}`, {
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
            console.error('Error editing gym:', error);
            return false;
        }
    };

    const editGymProcess = async () => {
        setRequiredFieldsError("");
        if (name && address) {
            setRequiredFieldsError("");
        } else {
            setRequiredFieldsError("Усі поля є обов'язковими");
            return false;
        }
        const gymData = {
            id: gymId,
            address,
            name,
            ownerId,
        };
        setLoading(true);
        if (await editGym(gymData)) {
            onClose();
            refreshTable();
        } else {
            setRequiredFieldsError("Сталась помилка при редагуванні. Спробуйте ще раз.");
            setLoading(false);
            return false;
        }

    };

    const editGym = async (gymData: Record<string, unknown>): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Gyms/${gymId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gymData),
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
            console.error('Error editing gym:', error);
            if (!requiredFieldsError) {
                setRequiredFieldsError('Сталась помилка при редагуванні. Спробуйте ще раз');
            }
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
                <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} placement="top-center">
                    <ModalContent>
                        {(close) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Редагування спортивного центру</ModalHeader>
                                <ModalBody>
                                    <div className={styles.FormElements}>
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
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Закрити
                                    </Button>
                                    <Button className="bg-[#E48100]" onClick={editGymProcess}>
                                        Редагувати
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
