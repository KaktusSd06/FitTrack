"use client";
import { TableAdminUsers } from "@/app/components/Table/TableAdminUsers";
import React, { useEffect, useState } from "react";
import { UserColumns } from "@/app/Api/user/user.json";
import { getUserByRole } from "@/app/Api/user/User";
import { User } from "@/app/Interfaces/Interfaces";
import { Spinner } from "@nextui-org/react";

export default function AdminUsers() {
    const [data, setData] = useState<User[]>([]); // Задайте відповідний тип даних для `data`
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Викликаємо асинхронну функцію для отримання даних користувачів
        const fetchData = async () => {
            setLoading(true);
            try {
                const users = await getUserByRole("User"); // Отримуємо дані користувачів
                setData(users);
                console.log(users);
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
            <TableAdminUsers columns={UserColumns} data={data} />
        </>
    );
}
