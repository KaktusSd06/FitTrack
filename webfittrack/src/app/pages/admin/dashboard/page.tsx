
"use client";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import StatsCard from './../../../components/StatsCard/StatsCard';
import styles from "./page.module.css"
import { Trainer, User } from "@/app/Interfaces/Interfaces";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import { Spinner } from "@nextui-org/react";
export default function AdminDashboard() {
    const [users, setusers] = useState<User[]>([]);
    const [trainers, settrainers] = useState<Trainer[]>([]);
    const [countusers, setcountusers] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
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

    const fetchData = useCallback(async () => {
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
                const response1 = await fetch(`/api/proxy/Gyms/get-users/${fetchedUser?.gymId}`);
                const response2 = await fetch(`/api/proxy/Gyms/get-trainers/${fetchedUser?.gymId}`);
                const trainer: Trainer[] = await response2.json();
                const user: User[] = await response1.json();
                setusers(user);
                settrainers(trainer);
                console.log(user);
                console.log(trainer);


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
        fetchData();
    }, [fetchData]);
    if (loading) return <Spinner label="Завантаження..." color="warning" />;

    return (
        <>
            <div className={styles.Container}>
                <div className={styles.StatsContainer}>
                    <div className={styles.StepsStats}>
                        <StatsCard
                            title="Зареєстровані користувачі в нашому залі"
                            value={users ? users.length : 0}
                            iconColor="#FAB88C"
                            iconSrc="/Stats/data_usage.svg"
                        />
                    </div>
                    <div className={styles.BasicStats}>
                        <StatsCard
                            title="Кількість наших тренерів"
                            value={trainers ? trainers.length : 0}
                            iconColor="#E6AD00"
                            iconSrc="/Stats/data_usage.svg"
                        />
                    </div>
                    <div className={styles.BasicStats}>
                        <StatsCard
                            title="Kcal"
                            value={600}
                            iconColor="#E6AD00"
                            iconSrc="/Stats/meat.svg"
                        />
                    </div>
                    <div className={styles.BasicStats}>
                        <StatsCard
                            title="Час тренувань на цьому тижні"
                            value={228}
                            unit="хв"
                            iconColor="#1CEC42"
                            iconSrc="/Stats/access_time.svg"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

