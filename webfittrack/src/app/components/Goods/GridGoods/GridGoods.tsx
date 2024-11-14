import { Spinner } from "@nextui-org/react";
import React from "react";
import { useEffect, useState } from "react";
import { fetchGymById } from "@/app/Api/gym/Gym";
import { Gym } from "@/app/Interfaces/Interfaces";
export default function GridGood() {
    const [data, setData] = useState<Gym | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Викликаємо асинхронну функцію для отримання даних користувачів
        const fetchData = async () => {
            setLoading(true);
            try {
                const id: number = 0;
                const gym = await fetchGymById(id); // Отримуємо дані користувачів
                setData(gym);
                console.log(gym);
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

        </>
    );
}