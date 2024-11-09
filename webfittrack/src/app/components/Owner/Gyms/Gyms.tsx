"use client";

import styles from "./Gyms.module.css";
import { Input, Button } from "@nextui-org/react"
import { useEffect, useState } from "react";
import ModalCreateGym from "../../Modal/GymsModals/ModalCreateGym/ModalCreateGym"
import ModalEditGym from "../../Modal/GymsModals/ModalEditGym/ModalEditGym"
import ModalDeleteGym from "../../Modal/GymsModals/ModelDeleteGym/ModalDeleteGym"
import { TableOwnerGyms } from "../../Table/TableOwnerGyms";
import { GymColumns } from "@/app/Api/gym/gym.json"
import { Gym } from "@/app/Interfaces/Interfaces";
import { fetchWithAuth } from "@/app/fetchWithAuth";

const Gyms: React.FC = () => {

    const [idOwner, setIdOwner] = useState("");
    const [data, setGyms] = useState<Gym[]>([]);

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;
        setIdOwner(id);
    }, []);

    useEffect(() => {
        getGyms();
    }, [idOwner]);

    const getGyms = async () => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Gyms/get-by-ownerId/${idOwner}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response) {
                console.error("No response received");
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
            return false;
        }
    }

    return (
        <div className={styles.Container}>
            <div className={styles.TopContainer}>
                <ModalCreateGym ownerId={idOwner}></ModalCreateGym>
                <ModalEditGym ownerId={idOwner} gymId={"3"}></ModalEditGym>
                <ModalDeleteGym gymId={"3"}></ModalDeleteGym>
            </div>
            <div className={styles.GymsContainer}>
                <TableOwnerGyms columns={GymColumns} data={data}></TableOwnerGyms>
            </div>
        </div>
    )
}

export default Gyms;
