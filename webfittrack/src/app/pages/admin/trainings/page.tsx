"use client";
import { GroupTrainingTable } from "@/app/components/Table/GroupTrainingTable";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import { GroupTraining } from "@/app/Interfaces/Interfaces";
import { Spinner } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { GroupColumns } from "@/app/Api/grouptraininng/group.json"
import { ModlaCreateGroupTraininig } from "@/app/components/Modal/ModlaCreateGroupTraininig/ModlaCreateGroupTraininig";
export default function AdminTrainings() {
    const [data, setData] = useState<GroupTraining[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setopenModal] = useState<boolean>(false);
    // const [openModalDelete, setopenModalDelete] = useState<boolean>(false);
    const [oneWeekAgo, setoneWeekAgo] = useState<string>("");
    const [oneWeekAhead, setoneWeekAhead] = useState<string>("");
    // const [gym, setGym] = useState<Gym>();
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
    const getISODateOffset = (daysOffset: number): string => {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        return date.toISOString().slice(0, 16); // Format as 'YYYY-MM-DDTHH:mm:ss'
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`/api/proxy/Admins/get-by-id/${curruserid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const fetchedUser = await response?.json();
            setGymId(fetchedUser?.gymId);
            if (fetchedUser?.gymId !== undefined) {
                const response1 = await fetch(`/api/proxy/GroupTrainings/get-by-gymId-and-period/${fetchedUser?.gymId}/${oneWeekAgo}/${oneWeekAhead}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                let temp: GroupTraining[];
                if (response1.status == 404) {
                    temp = [];
                }
                else if (response1.status == 200) {
                    temp = await response1.json();
                }
                const Grouptrainings: GroupTraining[] = temp;
                console.log("123" + Grouptrainings);
                setData(Grouptrainings);
            } else {
                console.error("User or gymId is undefined.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setoneWeekAgo(getISODateOffset(-7));
        setoneWeekAhead(getISODateOffset(7));
    }, []);

    useEffect(() => {
        if (oneWeekAgo && oneWeekAhead) {
            fetchData();
        }
    }, [oneWeekAgo, oneWeekAhead]);
    const handleOnOpen = () => {
        setopenModal(true);
        console.log("opent");
    };
    const handleOnClose = () => {
        setopenModal(false);
    };
    const handleOnDeleteOpen = async (training: GroupTraining) => {
        await fetch(`/api/proxy/GroupTrainings/${training.id}`, {
            method: 'DELETE',
        });
    };
    if (loading) return <Spinner label="Завантаження..." color="warning" />;

    return (
        <>
            <ModlaCreateGroupTraininig gymId={gymId} isopen={openModal} onClose={handleOnClose} ></ModlaCreateGroupTraininig>
            <GroupTrainingTable gymId={gymId} columns={GroupColumns} data={data} onCreate={handleOnOpen} onDelete={handleOnDeleteOpen} />
        </>
    );
}

