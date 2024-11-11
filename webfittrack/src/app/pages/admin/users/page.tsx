"use client";
import React, { useEffect, useState, useCallback } from "react";
import { columns } from "@/app/Columns/user.json";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { Gym, Trainer, User } from "@/app/Interfaces/Interfaces";
import { RoleProvider } from "@/app/Api/RoleProvider";
import { ModalCreateTrainer } from "@/app/components/Modal/ModalCreateTrainer/ModalCreateTrainer"
import { CustomTable } from "@/app/components/Table/CustomTable";
import { fetchWithAuth } from "@/app/fetchWithAuth";

export default function AdminUsers() {
    const [data, setData] = useState<User[] | Trainer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = React.useState("User");
    const [openModal, setopenModal] = useState<boolean>(false);
    const [gymId, setGymId] = useState<number>(0);

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
    const fetchData = useCallback(async (role: string) => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`/api/proxy/Admins/get-by-id/${curruserid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedUser = await response?.json();
            if (fetchedUser?.gymId !== undefined) {
                setGymId(fetchedUser?.gymId);
                const response = await fetch(`/api/proxy/Gyms/get-users/${fetchedUser?.gymId}`);
                const response1 = await fetch(`/api/proxy/Gyms/get-trainers/${fetchedUser?.gymId}`);
                const trainers: Trainer[] = await response1.json();
                const users: User[] = await response.json();

                const fetchedGym: Gym = await response.json();

                if (role === "User") {
                    console.log(users);
                    setData(users);
                }
                else if (role === "Trainer") {
                    setData(trainers);
                    console.log("trainers");
                }
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
    const handleOnOpen = () => {
        setopenModal(true);
        console.log("opent");
    };
    const handleOnClose = () => {
        setopenModal(false);
    };
    if (loading) return <Spinner label="Завантаження..." color="warning" />;

    return (
        <>
            <ModalCreateTrainer isopen={openModal} gymId={parseInt(gymId, 10)} onClose={handleOnClose} />
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
                        <CustomTable columns={columns} data={data} />
                    </RoleProvider>
                </Tab>
                <Tab key="Trainer"
                    title="Тренери"
                >
                    <RoleProvider role="Trainer">
                        <CustomTable columns={columns} data={data} onCreate={handleOnOpen} />
                    </RoleProvider>
                </Tab>
            </Tabs>
        </>
    );
}
