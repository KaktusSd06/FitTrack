import React, { useEffect, useState } from "react";
import styles from "./ModalKcalStats.module.css";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Tab,
    Tabs,
    Input,
    Button,
    CircularProgress,
    DateValue
} from "@nextui-org/react";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import StatsCard from "../../../StatsCard/StatsCard";
import ModalCreateMeal from "./../ModalCreateMeal/ModalCreateMeal"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
interface AppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface MealData {
    id: number,
    name: string,
    calories: number,
}

const AppModal: React.FC<AppModalProps> = ({ isOpen, onClose }) => {

    const [selected, setSelected] = useState<string>("Week")
    const [selectedContent, setSelectedContent] = useState<string>("meals");
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [totalKcal, setTotalKcal] = useState<number>(0);
    const [countMeals, setCountMeals] = useState<number>(0);
    const [error, setError] = useState("");
    const [mealsArray, setMealsArray] = useState<MealData[]>([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [todayMealArray, setTodayMealArray] = useState<MealData[]>([]);

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;
        setUserId(id);
        console.log("User ID set:", id);
    }, []);

    useEffect(() => {
        if (userId) {
            const today = new Date();
            getTodayMeals(formatDate(today));
        }
    }, [userId]);

    const calculatePeriodDates = (period: string) => {
        const today = new Date();
        let startDate = new Date();

        if (period === "Week") {
            startDate.setDate(today.getDate() - 7);
        } else if (period === "Month") {
            startDate.setMonth(today.getMonth() - 1);
        } else if (period === "Year") {
            startDate.setMonth(0);
            startDate.setDate(1);
        }

        console.log(startDate);
        console.log(today);

        return {
            fromDate: formatDate(startDate),
            toDate: formatDate(today),
        };
    };

    const showStats = () => {
        setSelectedContent("stats");

    }

    const showMeals = () => {
        setSelectedContent("meals");

    }

    const getTodayMeals = async (today: string): Promise<boolean | undefined> => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/proxy/Meals/get-by-userId-and-day/${userId}/${today}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                if (response.status === 201 || response.status === 200) {
                    const data = await response.json();
                    setTodayMealArray(data);
                    console.log(data);

                    // Підрахунок калорій та кількості страв
                    const totalKcalValue = data.reduce((sum: number, meal: MealData) => sum + meal.calories, 0);
                    setTotalKcal(totalKcalValue);
                    setCountMeals(data.length);
                    setIsLoading(false);
                    return true;
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    console.log(`Error: ${response.status} ${response.statusText}`);
                    setIsLoading(false);
                    return false;
                }
            }
        } catch (error) {
            console.error('Error fetching meals data:', error);
            setIsLoading(false);
            return false;
        }
    };

    const deleteMeal = async (mealId: string): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`/api/proxy/Meals/${mealId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                if (response.status === 201 || response.status === 200 || response.status === 204) {
                    refresh();
                    return true;
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    console.log(`Error: ${response.status} ${response.statusText}`);
                    return false;
                }
            }
        } catch (error) {
            console.error('Error delete meals data:', error);
            return false;
        }
    };

    const refresh = async () => {
        setIsLoading(true);
        const today = new Date();
        await getTodayMeals(formatDate(today));
        setIsLoading(false);
    }

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };




    return (
        <Modal
            classNames={{
                base: "h-screen"
            }}
            isOpen={isOpen}
            onOpenChange={(newState) => {
                if (!newState) onClose();
            }}
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Калорії</ModalHeader>
                <ModalBody>
                    {isLoading ? (
                        <div className={styles.LoadingContainer}>
                            <CircularProgress size="lg" classNames={{ base: "w-full", indicator: "stroke-[--fulvous]" }} />
                        </div>
                    ) : (
                        <div className={styles.containerWrapper}>
                            <div className={styles.TopContent}>
                                <div className={styles.BasicStats}>
                                    <StatsCard
                                        title="Kcal"
                                        value={totalKcal}
                                        iconColor="#E6AD00"
                                        iconSrc="/Stats/meat.svg"
                                        onClick={showMeals}
                                    />
                                </div>
                                <div className={styles.BasicStats}>
                                    <StatsCard
                                        title="Статистика"
                                        // value={600}
                                        onClick={showStats}
                                    />
                                </div>
                            </div>
                            <div className={styles.content}>
                                {selectedContent === "meals" && (
                                    <>
                                        <div className={styles.mealsContainer}>
                                            <div className={styles.mealsTop}>
                                                <p>Кількість: {countMeals}</p>
                                                <ModalCreateMeal userId={userId} onMealCreated={refresh}></ModalCreateMeal>
                                            </div>
                                            <div className={styles.mealsContent}>
                                                {todayMealArray.map((meal) => (
                                                    <div key={meal.id} className={styles.mealCard}>
                                                        <div className={styles.rightContainer}>
                                                            <p className={styles.mealName}>{meal.name}</p>
                                                            <p className={styles.kcal}>{meal.calories} Kcal</p>
                                                        </div>
                                                        <img
                                                            className={styles.Icon}
                                                            src="/delete-outline.svg"
                                                            alt="delete"
                                                            onClick={() => deleteMeal(String(meal.id))}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AppModal;
