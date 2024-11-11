"use client";
import React, { useEffect, useState, useCallback } from "react";
import { MembershipColumns, SerivceColumns } from "@/app/Api/membership/mem.json";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { Gym, Membership, Service } from "@/app/Interfaces/Interfaces";
import { RoleProvider } from "@/app/Api/RoleProvider";
import { ModalCreateService } from "@/app/components/Modal/ModalCreateService/ModalCreateService"
import { CustomTable } from "@/app/components/Table/CustomTable";
import { fetchWithAuth } from "@/app/fetchWithAuth";

export default function AdminUsers() {
    const [data, setData] = useState<Service[] | Membership[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = React.useState("Service");
    const [openModalService, setopenModalService] = useState<boolean>(false);
    const [openModalMembership, setopenModalMembership] = useState<boolean>(false);

    const user = localStorage.getItem("currentUser");
    const [gymId, setGymId] = useState<number>(0);
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
                const response1 = await fetch(`/api/proxy/Gyms/get-services/${fetchedUser?.gymId}`);
                const response2 = await fetch(`/api/proxy/Gyms/get-memberships/${fetchedUser?.gymId}`);
                let services: Service[];
                if (await response1.status !== 200) {
                    services = [];
                }
                else {
                    services = await response1.json();
                }
                let memberships: Membership[];
                if (await response2.status !== 200) {
                    memberships = [];
                }
                else {
                    memberships = await response2.json();
                }
                if (role === "Membership") {
                    console.log(memberships);
                    setData(memberships);
                }
                else if (role === "Service") {
                    setData(services);
                    console.log(services);
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

    useEffect(() => {
        fetchData(selectedRole);
    }, [selectedRole, fetchData]);
    const handleOnOpenService = () => {
        setopenModalService(true);
        console.log("opent");
    };
    const handleOnOpenMembership = () => {
        setopenModalMembership(true);
        console.log("opent");
    };
    const handleOnCloseMembership = () => {
        setopenModalMembership(false);
    };
    const handleOnCloseService = () => {
        setopenModalService(false);
    };
    if (loading) return <Spinner label="Завантаження..." color="warning" />;

    return (
        <>
            <ModalCreateService isopen={openModalService} gymId={parseInt(gymId, 10)} onClose={handleOnCloseService} />
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
                <Tab key="Membership"
                    title="Абонименти"
                >
                    <RoleProvider role="Membership">
                        <CustomTable columns={MembershipColumns} data={data} />
                    </RoleProvider>
                </Tab>
                <Tab key="Service"
                    title="Послуги"
                >
                    <RoleProvider role="Service">
                        <CustomTable columns={SerivceColumns} data={data} onCreate={handleOnOpenService} />
                    </RoleProvider>
                </Tab>
            </Tabs>
        </>
    );
}

