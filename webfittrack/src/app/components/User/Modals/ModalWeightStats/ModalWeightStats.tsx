import React, { useEffect, useState } from "react";
import styles from "./ModalWeightStats.module.css";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
interface AppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface WeightData {
    date: string;
    weight: number;
}

const AppModal: React.FC<AppModalProps> = ({ isOpen, onClose }) => {

    const [selected, setSelected] = useState<string>("Week")
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [weight, setWeight] = useState<number>(0);
    const [error, setError] = useState("");
    const [weightsArray, setWeightArray] = useState<WeightData[]>([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [periodWeightArray, setPeriodWeightArray] = useState<WeightData[]>([]);


    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;
        setUserId(id);
        console.log("User ID set:", id); // Логування ID користувача
    }, []);

    useEffect(() => {
        if (userId) {
            getWeight();
        }
    }, [userId]);



    useEffect(() => {
        if (userId) {
            const { fromDate, toDate } = calculatePeriodDates(selected);
            setFromDate(fromDate);
            setToDate(toDate);
            getWeightByPeriod(fromDate, toDate);
        }
    }, [selected]);

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


    const getWeightByPeriod = async (fromDate: string, toDate: string): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`/api/proxy/WeightsInfo/get-by-userId-and-period/${userId}/${fromDate}/${toDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                if (response.status === 201 || response.status === 200) {
                    const data = await response.json();
                    const filteredData = data.filter((item: { date: string; }) => item.date !== "0001-01-01T00:00:00");
                    setPeriodWeightArray(filteredData);
                    return true;
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    console.log(`Error: ${response.status} ${response.statusText}`);
                    return false;
                }
            }
        } catch (error) {
            console.error('Error fetching weight data:', error);
            return false;
        }
    };

    const getWeight = async (): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`/api/proxy/WeightsInfo/get-by-userId/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response) {
                if (response.status === 201 || response.status === 200) {
                    // Отримуємо дані з API
                    const data = await response.json();

                    const filteredData = data.filter((item: { date: string; }) => item.date !== "0001-01-01T00:00:00");
                    setWeightArray(filteredData);
                    setWeight(filteredData.length > 0 ? filteredData[filteredData.length - 1].weight : 0);

                    return true;
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    console.log(`Error: ${response.status} ${response.statusText}`);
                    return false;
                }
            }
        } catch (error) {
            console.error('Error fetching weight data:', error);
            return false;
        }
    };

    const saveUserWight = async (weightData: any): Promise<boolean | undefined> => {
        try {
            const response = await fetchWithAuth(`/api/proxy/WeightsInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(weightData),
            });
            if (response)
                if (response.status === 201 || response.status === 200) {
                    return true;
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    console.log(`Error: ${response.status} ${response.statusText}`);
                    return false;
                }

        } catch (error) {
            console.error('Error registering user:', error);
            return false;
        }
    };

    const handleStartEdit = () => {
        setIsReadOnly(false);
    };

    const handleCancelEdit = () => {
        setIsReadOnly(true);
    }

    const handleEndEdit = async () => {
        setIsLoading(true);
        if (!weight || weight === 0) {
            setError("Введіть вагу");
            setIsLoading(false);
            return;

        }
        if (weight < 0) {
            setError("Вага не може бути менше 0");
            setIsLoading(false);
            return;
        }

        const weightData = {
            weight: weight,
            date: formatDate(new Date()),
            userId: userId,
        };

        const isSaved = await saveUserWight(weightData); // Зберігаємо вагу

        if (isSaved) {
            const { fromDate, toDate } = calculatePeriodDates(selected);
            setFromDate(fromDate);
            setToDate(toDate);
            await getWeightByPeriod(fromDate, toDate);
            setIsReadOnly(true);
            setIsLoading(false);
        } else {
            setError("Сталась помилка при збережені.");
            setIsLoading(false);
            return;
        }
    };

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const chartData = {
        labels: periodWeightArray.map((item) => {
            const date = new Date(item.date); // Перетворюємо рядок у дату
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Отримуємо місяць (заповнюємо нулями до 2 символів)
            const day = String(date.getDate()).padStart(2, "0"); // Отримуємо день (заповнюємо нулями до 2 символів)
            return `${month}-${day}`; // Форматуємо як MM-DD
        }),
        datasets: [
            {
                label: "Вага",
                data: periodWeightArray.map((item) => item.weight), // Значення ваги
                borderColor: "#e48100",
                backgroundColor: "rgba(228, 129, 0, 0.2)",
                fill: true,
            },
        ],
    };

    return (
        <Modal
            classNames={{
                base: "h-screen"
            }}
            isOpen={isOpen}
            onOpenChange={(newState) => {
                if (!newState) onClose(); // Закрити, якщо модальне вікно змінює стан на закрите
            }}
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Вага</ModalHeader>
                <ModalBody>
                    {isLoading ? (
                        <div className={styles.LoadingContainer}>
                            <CircularProgress size="lg" classNames={{ base: "w-full", indicator: "stroke-[--fulvous]" }} />
                        </div>
                    ) : (
                        <div className={styles.containerWrapper}>
                            <div className={styles.wageInput}>
                                <Input
                                    isReadOnly={isReadOnly}
                                    type="Number"
                                    placeholder="00"
                                    variant="bordered"
                                    value={weight.toString()}
                                    onChange={(e) => {
                                        setWeight(Number(e.target.value));
                                        setError("");
                                    }}
                                    className={styles.input}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">кг</span>
                                        </div>
                                    }
                                />
                                <div className={styles.ButtonsContainer}>
                                    {isReadOnly ? (
                                        <Button
                                            className={styles.Button}
                                            onClick={handleStartEdit}
                                            startContent={
                                                <img src="/edit.svg" alt="" className={styles.ButtonIcon} />
                                            }
                                        >
                                            Редагувати дані
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={handleEndEdit}
                                                className={styles.Button}
                                                startContent={
                                                    <img className={styles.ButtonIcon} src="/save.svg" alt="" />
                                                }
                                            >
                                                Зберегти
                                            </Button>
                                            <Button
                                                className={styles.Button}
                                                onClick={handleCancelEdit}
                                                startContent={
                                                    <img className={styles.ButtonIcon} src="/cancel.svg" alt="" />
                                                }
                                            >
                                                Скасувати
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <Tabs
                                classNames={{
                                    base: "flex justify-center",
                                    cursor: "w-full bg-[#e48100]",
                                    tabContent: `group-data-[selected=true]:text-[#FFFFFF]  ${styles.tabLabel}`,

                                }}
                                variant="bordered"
                                aria-label="FilterTabs"
                                selectedKey={selected}
                                onSelectionChange={(key: string | number) => setSelected(String(key))} // Type key as string | number and convert to string
                            >
                                <Tab className={styles.Tab} key="Week" title="Тиждень">
                                    <div className={styles.chartContainer}>
                                        {periodWeightArray.length > 0 ? (
                                            <Line data={chartData} />
                                        ) : (
                                            <p>Дані для обраного періоду відсутні</p>
                                        )}
                                    </div>
                                </Tab>
                                <Tab
                                    className={styles.Tab}
                                    key="Month"
                                    title="Місяць"
                                >
                                    <div className={styles.chartContainer}>
                                        {periodWeightArray.length > 0 ? (
                                            <Line data={chartData} />
                                        ) : (
                                            <p>Дані для обраного періоду відсутні</p>
                                        )}
                                    </div>
                                </Tab>
                                <Tab
                                    className={styles.Tab}
                                    key="Year"
                                    title="Рік"
                                >
                                    <div className={styles.chartContainer}>
                                        {periodWeightArray.length > 0 ? (
                                            <Line data={chartData} />
                                        ) : (
                                            <p>Дані для обраного періоду відсутні</p>
                                        )}
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AppModal;
