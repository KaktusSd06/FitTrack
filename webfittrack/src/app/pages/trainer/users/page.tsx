"use client";
import React, { useEffect, useState, useCallback } from "react";
import { columns } from "@/app/Columns/user.json";
import { Spinner } from "@nextui-org/react";
import { Trainer, User } from "@/app/Interfaces/Interfaces";
import { RoleProvider } from "@/app/Api/RoleProvider";
import { CustomTable } from "@/app/components/Table/CustomTable";
import { fetchWithAuth } from "@/app/fetchWithAuth";

export default function TrainerUsers() {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = React.useState("User");
    const [gymId, setGymId] = useState<number>(0);

    const user = localStorage.getItem("currentUser");

    let curruserid: string;
    if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.userId && parsedUser.role === "Trainer") {
            curruserid = parsedUser.userId;

        }
        else {
            window.history.back();
        }
    }
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`/api/proxy/Trainers/get-by-id/${curruserid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedUser = await response?.json();
            if (fetchedUser?.gymId !== undefined) {
                setGymId(fetchedUser?.gymId);
                const response = await fetch(`/api/proxy/Gyms/get-users/${fetchedUser?.gymId}`);
                setData(await response.json());
                console.log(data);

            } else {
                console.error("User or gymId is undefined.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch data for the initial role when the component mounts
    useEffect(() => {
        fetchData();
    }, [selectedRole, fetchData]);

    if (loading) return <Spinner label="Завантаження..." color="warning" />;

    return (
        <>
            <RoleProvider role="User">
                <CustomTable columns={columns} data={data} />
            </RoleProvider>
        </>
    );
}
