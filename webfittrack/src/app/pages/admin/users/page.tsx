import { CustomTable } from "@/app/components/Table/Table";
import React from "react";
import { columns } from "@/app/Columns/user.json"

export default function AdminUsers() {
<<<<<<< HEAD
=======
    const [data, setData] = useState<User[]>([]); // Задайте відповідний тип даних для `data`
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Викликаємо асинхронну функцію для отримання даних користувачів
        const fetchData = async () => {
            setLoading(true);
            try {
                const users = await getUserByRole("User"); // Отримуємо дані користувачів
                setData(users);
                console.log(data[0].role);
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
>>>>>>> 5b36690 (addded ability for creating trainers)

    return (
        <>
            <CustomTable columns={columns} />
        </>
    );
}

