"use client";
import React, { useEffect, useState, useCallback } from "react";
import { columns } from "@/app/Columns/user.json";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { Trainer, User } from "@/app/Interfaces/Interfaces";
import { TableAdminUsers } from "@/app/components/Table/TableAdminUsers";
import { RoleProvider } from "@/app/Api/RoleProvider";
import { getAdminById } from "@/app/Api/admin/Admin";
import { fetchGymById } from "@/app/Api/gym/Gym";

export default function AdminUsers() {
    const [data, setData] = useState<User[] | Trainer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = React.useState("User");
    // const [gym, setGym] = useState<Gym>();
    const user = localStorage.getItem("currentUser");

    let curruserid: string;
    if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.userId && parsedUser.role === "Admin") {
            curruserid = parsedUser.userId;

        }
        else {
            window.history.back();
        }
    }
    // Define fetchData as a callback to fetch data based on selected role
    const fetchData = useCallback(async (role: string) => {
        setLoading(true);
        try {
            const fetchedUser = await getAdminById(curruserid);
            // setCurrentUser(fetchedUser);

            if (fetchedUser?.gymId !== undefined) {
                const fetchedGym = await fetchGymById(fetchedUser.gymId);
                // setGym(fetchedGym);

                let users: React.SetStateAction<User[] | Trainer[]> = [];
                if (role === "Trainer" && fetchedGym.trainers !== undefined) {
                    users = fetchedGym.trainers;
                } else if (role === "User" && fetchedGym.users !== undefined) {
                    users = fetchedGym.users;
                }

                console.log(users);
                setData(users);
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
        fetchData(selectedRole);
    }, [selectedRole, fetchData]);

    if (loading) return <Spinner label="Завантаження..." color="warning" />;

    return (
        <Tabs
            classNames={{
                cursor: "w-full bg-[#e48100]",
                tabContent: "group-data-[selected=true]:text-[#e48100]",
                tabList: "pt-[20px] px-[20px]",
            }}
            variant="underlined"
            aria-label="FilterTabs"
            selectedKey={selectedRole}
            onSelectionChange={(key) => setSelectedRole(key.toString())}        >
            <Tab key="User"
                title="Користувачі"
            >
                <RoleProvider role="User">
                    <TableAdminUsers columns={columns} data={data} />
                </RoleProvider>
            </Tab>
            <Tab key="Trainer"
                title="Тренери"
            >
                <RoleProvider role="Trainer">
                    <TableAdminUsers columns={columns} data={data} />
                </RoleProvider>
            </Tab>
        </Tabs>
    );
}
