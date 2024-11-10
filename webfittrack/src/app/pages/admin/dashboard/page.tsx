
"use client";
import { CustomTable } from "@/app/components/Table/CustomTable";
import { GymColumns } from "@/app/Api/gym/gym.json"
import { Spinner } from "@nextui-org/react";
import { fetchGymsByOwnerId } from "@/app/Api/gym/Gym";
import { useEffect, useState } from "react";
import { Gym } from "@/app/Interfaces/Interfaces";

import { RoleProvider } from "@/app/Api/RoleProvider";
import { ModalCreateTrainer } from "@/app/components/Modal/ModalCreateTrainer/ModalCreateTrainer"

export default function AdminDashboard() {
    const [data, setData] = useState<Gym[]>([]); // Задайте відповідний тип даних для `data`
    const [loading, setLoading] = useState<boolean>(true);
    const [openedit, setopenedit] = useState<boolean>(false);
    const [opendelete, setopendelete] = useState<boolean>(false);

    useEffect(() => {
        // Викликаємо асинхронну функцію для отримання даних користувачів
        const fetchData = async () => {
            setLoading(true);
            try {

                const Gym = await fetchGymsByOwnerId("5ae9c383-48bd-42dc-b224-fb2132c7f17e"); // Отримуємо дані користувачів
                setData(Gym);
                console.log(Gym);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleDelete = (curr: Gym) => {
        console.log(curr);
        setopenedit(true);
    };
    const handleEdit = (curr: Gym) => {
        console.log(curr);
        setopendelete(true);
    };
    const handleDeleteClose = () => {
        setopendelete(false);
    };
    const handleEditClose = () => {
        setopenedit(false);
    };
    if (loading) return <Spinner label="Завантаження..." color="warning" />;

    return (
        <>
            <ModalCreateTrainer isopen={openedit} gymId={1} onClose={handleEditClose} />
            <ModalCreateTrainer isopen={opendelete} gymId={1} onClose={handleDeleteClose} />
            <RoleProvider role="Gym">

                <CustomTable
                    columns={GymColumns}
                    data={data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </RoleProvider>
        </>
    );
}

