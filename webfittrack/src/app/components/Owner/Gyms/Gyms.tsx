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

const Gyms: React.FC = () => {

    const [idOwner, setIdOwner] = useState("");
    const [data, setGyms] = useState<Gym[]>([]);

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;
        setIdOwner(id);
    }, []);

    useEffect(() => {

    }, [idOwner]);

    return (
        <div className={styles.Container}>
            <div className={styles.TopContainer}>
                <div className={styles.Search}>
                    <Input
                        label="Пошук"
                        // isClearable
                        radius="md"
                        endContent={
                            <img src="/search.svg" className={`w-[24px] h-[24px]`} />
                        }
                    />
                </div>
                <ModalCreateGym ownerId={idOwner}></ModalCreateGym>
                <ModalEditGym ownerId={idOwner} gymId={"3"}></ModalEditGym>
                <ModalDeleteGym gymId={"3"}></ModalDeleteGym>
            </div>
            <div className={styles.GymsContainer}>
                <TableOwnerGyms columns={GymColumns}> data={data}</TableOwnerGyms>
            </div>
        </div>
    )
}

export default Gyms;
