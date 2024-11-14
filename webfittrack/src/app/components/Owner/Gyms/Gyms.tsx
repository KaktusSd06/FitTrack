"use client";

import styles from "./Gyms.module.css";
import { useEffect, useState } from "react";
import ModalCreateGym from "../../Modal/GymsModals/ModalCreateGym/ModalCreateGym";
import { TableOwnerGyms } from "../../Table/TableOwnerGyms";
import { GymColumns } from "@/app/Api/gym/gym.json";
import { Gym } from "@/app/Interfaces/Interfaces";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import { CircularProgress } from "@nextui-org/react";

const Gyms: React.FC = () => {
    const [idOwner, setIdOwner] = useState("");
    const [data, setGyms] = useState<Gym[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser && parsedUser.userId) {
                setIdOwner(parsedUser.userId);
            }
        }
    }, []);

    useEffect(() => {
        if (idOwner) {
            getGyms();
        }
    }, [idOwner]);

    const getGyms = async () => {
        try {
            console.log(idOwner);
            setIsLoading(true); // Починаємо завантаження
            const response = await fetchWithAuth(`/api/proxy/Gyms/get-by-ownerId/${idOwner}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response) {
                console.error("No response received");
                setIsLoading(false); // Завершуємо завантаження при помилці
                return false;
            }

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            if (response.status === 200) {
                const data = await response.json();
                setGyms(data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setIsLoading(false); // Завершуємо завантаження
        }
    };

    const handleGymCreated = async () => {
        setIsLoading(true); // Починаємо завантаження перед створенням
        await getGyms(); // Оновлюємо список залів після створення
        setIsLoading(false); // Завершуємо завантаження після завершення операції
    };

    return (
        <div className={styles.Container}>
            <div className={styles.TopContainer}>
                <div className={styles.TopContainer}>
                    <ModalCreateGym ownerId={idOwner} onGymCreated={handleGymCreated}></ModalCreateGym>
                </div>
            </div>
            <div className={styles.GymsContainer}>
                {isLoading ? (
                    <div className={styles.LoadingContainer}>
                        <CircularProgress size="lg" classNames={{ base: "w-full", indicator: "stroke-[--fulvous]" }} />
                    </div>
                ) : (
                    <TableOwnerGyms refreshTable={getGyms} columns={GymColumns} data={data} />
                )}
            </div>
        </div>
    );
};

export default Gyms;
