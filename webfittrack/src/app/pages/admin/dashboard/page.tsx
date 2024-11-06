<<<<<<< HEAD
import { CustomTable } from "@/app/components/Table/Table";
import React from "react";
import { columns } from "@/app/Columns/user.json"
=======
"use client";
import { TableOwnerGyms } from "@/app/components/Table/TableOwnerGyms";
import { GymColumns } from "@/app/Api/gym/gym.json"
import { Spinner } from "@nextui-org/react";
import { fetchGymsByOwnerId } from "@/app/Api/gym/Gym";
import { useEffect, useState } from "react";
import { Gym } from "@/app/Interfaces/Interfaces";
>>>>>>> 5b36690 (addded ability for creating trainers)

export default function AdminDashboard() {
    const [data, setData] = useState<Gym[]>([]); // Задайте відповідний тип даних для `data`
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Викликаємо асинхронну функцію для отримання даних користувачів
        const fetchData = async () => {
            setLoading(true);
            try {

                const Gym = await fetchGymsByOwnerId("12123312"); // Отримуємо дані користувачів
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

    if (loading) return <Spinner label="Завантаження..." color="warning" />; // Показуємо "завантаження" під час виконання запиту

    return (
        <>
<<<<<<< HEAD
            <CustomTable columns={columns} />
=======
            <TableOwnerGyms columns={GymColumns} data={data}></TableOwnerGyms>
>>>>>>> 5b36690 (addded ability for creating trainers)
        </>
    );
}

