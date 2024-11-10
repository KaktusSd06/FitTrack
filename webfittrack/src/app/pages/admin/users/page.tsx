"use client";
import React, { useEffect, useState, useCallback } from "react";
import { columns } from "@/app/Columns/user.json";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { Gym, Trainer, User } from "@/app/Interfaces/Interfaces";
import { TableAdminUsers } from "@/app/components/Table/TableAdminUsers";
import { RoleProvider } from "@/app/Api/RoleProvider";
import { getAdminById } from "@/app/Api/admin/Admin";
import { fetchGymById } from "@/app/Api/gym/Gym";
import { ModalCreateTrainer } from "@/app/components/Modal/ModalCreateTrainer/ModalCreateTrainer"
import { CustomTable } from "@/app/components/Table/CustomTable";

export default function AdminUsers() {
    const [data, setData] = useState<User[] | Trainer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = React.useState("User");
    const [openModal, setopenModal] = useState<boolean>(false);

    // const [gym, setGym] = useState<Gym>();
    const user = localStorage.getItem("currentUser");
    let gymId: string = "27";
    // let gymId: string | null = localStorage.getItem("gymId");
    // if (gymId === null) {
    //     gymId = "27";
    // }

    let curruserid: string;
    // if (user) {
    //     const parsedUser = JSON.parse(user);
    //     if (parsedUser && parsedUser.userId && parsedUser.role === "Admin") {
    //         curruserid = parsedUser.userId;

    //     }
    //     else {
    //         window.history.back();
    //     }
    // }
    // Define fetchData as a callback to fetch data based on selected role
    const fetchData = useCallback(async (role: string) => {
        setLoading(true);
        try {
            // const fetchedUser = await getAdminById(curruserid);
            // setCurrentUser(fetchedUser);

            // if (fetchedUser?.gymId !== undefined) {
            const response = await fetch(`/api/proxy/Gyms/${27}`);
            const response1 = await fetch(`/api/proxy/Gyms/get-trainers/${27}`);
            const trainers: Trainer[] = await response1.json();
            // setGym(fetchedGym);
            const fetchedGym: Gym = await response.json();
            let users: React.SetStateAction<User[] | undefined> = [];
            users = fetchedGym.users;
            if (role === "User") {
                console.log(users);
                setData(users);
            }
            else if (role === "Trainer") {
                setData(trainers);
                console.log("trainers");
            }
            // } else {
            //     console.error("User or gymId is undefined.");
            // }
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
