"use client";
import React, { useEffect, useState, useCallback } from "react";
import { columns } from "@/app/Columns/user.json";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { getUserByRole } from "@/app/Api/user/User";
import { Trainer, User } from "@/app/Interfaces/Interfaces";
import { TableAdminUsers } from "@/app/components/Table/TableAdminUsers";
import { RoleProvider } from "@/app/Api/RoleProvider";

export default function AdminUsers() {
    const [data, setData] = useState<User[] | Trainer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = React.useState("User");

    // Define fetchData as a callback to fetch data based on selected role
    const fetchData = useCallback(async (role: string) => {
        setLoading(true);
        try {
            const users = await getUserByRole(role); // Fetch data based on role
            setData(users);
            console.log("Fetched data for role:", role);
        } catch (error) {
            console.error("Error fetching users:", error);
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
                onClick={() => {
                    setSelectedRole("User"); // Update role
                    fetchData("User");
                    console.log("User");
                }}
            >
                <RoleProvider role="User">
                    <TableAdminUsers columns={columns} data={data} />
                </RoleProvider>
            </Tab>
            <Tab key="Trainer"
                title="Тренери"
                onClick={() => {
                    setSelectedRole("Trainer"); // Update role
                    fetchData("Trainer");
                    console.log("Trainer");
                }}
            >
                <RoleProvider role="Trainer">
                    <TableAdminUsers columns={columns} data={data} />
                </RoleProvider>
            </Tab>
        </Tabs>
    );
}
