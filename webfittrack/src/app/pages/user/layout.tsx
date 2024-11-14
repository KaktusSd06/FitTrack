"use client"

import Navbar from "@/app/components/navbar/Navbar";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";
import styles from "./layout.module.css";
import { UserButtonData } from "@/app/Interfaces/Interfaces";

interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser && parsedUser.email) {
                setEmail(parsedUser.email);
            }
        }
    }, []);

    useEffect(() => {
        if (email) {
            getUser();
        }
    }, [email]);

    const getUser = async (): Promise<boolean | undefined> => {

        try {
            const response = await fetch(`/api/proxy/Users/get-by-email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            if (response.status === 200) {
                const data = await response.json();
                console.log(data.id);
                setFirstName(data.firstName);
                setLastName(data.lastName);
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
            return false;
        }
    };

    return (
        <div className={styles.flex} >
            <div>
                <Sidebar buttonsData={UserButtonData} />
            </div>
            <div className={styles.main}>
                <Navbar firstName={firstName} lastName={lastName} />
                {children}
            </div>
        </div>
    );
};

export default Layout;
