"use client";

import styles from "./Admins.module.css";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { useEffect, useState } from "react";
import ModalCreateGym from "../../Modal/GymsModals/ModalCreateGym/ModalCreateGym"
import ModalEditGym from "../../Modal/GymsModals/ModalEditGym/ModalEditGym"
import ModalDeleteGym from "../../Modal/GymsModals/ModelDeleteGym/ModalDeleteGym"
import { Gym, Admin } from "@/app/Interfaces/Interfaces";
import { fetchWithAuth } from "@/app/fetchWithAuth";

const Admins: React.FC = () => {

    const [idOwner, setIdOwner] = useState("");
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [currentGym, setCurrentGym] = useState<Gym>();


    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;
        setIdOwner(id);
    }, []);

    useEffect(() => {
        if (idOwner)
            getGyms();
    }, [idOwner]);

    useEffect(() => {
        if (gyms && idOwner)
            getAdmins();
    }, [currentGym]);

    const getGyms = async (): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Gyms/get-by-ownerId/${idOwner}`, {
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
                const data = response.json();
                setGyms(await data);
                console.log(gyms[0]);
            } else if (response.status === 500) {

                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error getting gyms:', error);
            return false;
        }
    };

    const getAdmins = async (): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Gyms/get-by-ownerId/${idOwner}`, {
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
                const data = response.json();
                setGyms(await data);
                console.log(gyms[0]);
            } else if (response.status === 500) {

                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error getting gyms:', error);
            return false;
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.TopContainer}>
                <div className={styles.SelectContainer}>
                    <Autocomplete
                        label="Оберіть спортивний центр"
                        className="max-w-xs"
                    >
                        {gyms.map((gym) => (
                            <AutocompleteItem key={gym.id} value={gym.id}>
                                {`${gym.name} | ${gym.address}`}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>
            </div>
            <div className={styles.AdminsContainer}>

            </div>
        </div>
    )
}

export default Admins;
