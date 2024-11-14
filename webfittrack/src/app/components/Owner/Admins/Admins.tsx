"use client";

import styles from "./Admins.module.css";
import { Autocomplete, AutocompleteItem, CircularProgress } from "@nextui-org/react"
import { useEffect, useState } from "react";
import ModalCreateAdmin from "../../Modal/AdminModals/ModalCreateAdmin/ModalCreateAdmin";
import { Gym, Admin } from "@/app/Interfaces/Interfaces";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import { TableOwnerAdmins } from "../../Table/TableOwnerAdmins";
import { AdminColumns } from "@/app/Api/admin/admin.json";
const Admins: React.FC = () => {

    const [idOwner, setIdOwner] = useState("");
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [selectedGymId, setSelectedGymId] = useState("");
    const [isLoading, setIsLoading] = useState(false);


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
    }, [selectedGymId]);

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

    const handleAdminCreated = async () => {
        setIsLoading(true);
        await getAdmins();
        setIsLoading(false);
    };

    const onSelectionChange = (id: string | number | null) => {
        if (id) {
            setSelectedGymId(id.toString());
            console.log(selectedGymId);
        }

    };

    const getAdmins = async (): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/Gyms/get-admins/${selectedGymId}`, {
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
                setAdmins(await data);
                console.log(admins[0]);
            } else if (response.status === 500) {

                return false;
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error getting admins:', error);
            return false;
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.TopContainer}>
                <div className={styles.SelectContainer}>
                    <Autocomplete
                        onSelectionChange={onSelectionChange}
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
                <ModalCreateAdmin gymId={selectedGymId} onAdminCreated={handleAdminCreated}></ModalCreateAdmin>
            </div>
            <div className={styles.AdminsContainer}>
                {isLoading ? (
                    <div className={styles.LoadingContainer}>
                        <CircularProgress size="lg" classNames={{ base: "w-full", indicator: "stroke-[--fulvous]" }} />
                    </div>
                ) : (
                    <TableOwnerAdmins data={admins} refreshTable={getGyms} columns={AdminColumns}></TableOwnerAdmins>)}
            </div>
        </div>
    )
}

export default Admins;
