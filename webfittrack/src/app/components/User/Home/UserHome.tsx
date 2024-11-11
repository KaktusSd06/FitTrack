"use client";

import styles from "./UserHome.module.css";
import StatsCard from "../../StatsCard/StatsCard";
import Stopwatch from "../StopwatchCard/Stopwatch/Stopwatch";
import { Button, Tab, Tabs } from "@nextui-org/react";
import Calendar from "../Calendar/Calendar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import { useRouter } from "next/router";
import { User } from "@/app/Interfaces/Interfaces";
import ModalWeightStats from "./../Modals/ModalWeightStats/ModalWeightStats"
import ModalKcalStats from "./../Modals/ModalKcalStats/ModalKcalStats"
import { IndTraining } from "../IndTraining";
import { TableIndTrainings } from "../../Table/IndTable"
import { IndividualTrainingColumns } from "../individualTrainingsColumns.json"

interface MealData {
  id: number,
  name: string,
  calories: number,
}

const UserHome = () => {
  const [indTrainings, setIndTrainings] = useState<IndTraining[]>([]);
  const [userId, setUserId] = useState("");
  const [isModalWeightOpen, setModalWeightOpen] = useState<boolean>(false);
  const [isModalKcalOpen, setModalKcalOpen] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(0);
  const [kcal, setKcal] = useState<number>(0);
  const [steps, setSteps] = useState<number>(10234);



  const handleClick = () => {
    openWeightModal();
  };

  const handleKcalClick = () => {
    openKcalModal();
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;
    setUserId(id);
  }, []);

  useEffect(() => {
    if (userId) {
      const today = new Date();
      getTodayMeals(formatDate(today));
      getWeight();
    }

  }, [userId]);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
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

  const getTodayMeals = async (today: string): Promise<boolean | undefined> => {
    try {

      const response = await fetch(`/api/proxy/Meals/get-by-userId-and-day/${userId}/${today}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        if (response.status === 201 || response.status === 200) {
          const data = await response.json();
          const totalKcalValue = data.reduce((sum: number, meal: MealData) => sum + meal.calories, 0);
          setKcal(totalKcalValue);
          return true;
        } else {
          const errorData = await response.json();
          console.log(errorData);
          console.log(`Error: ${response.status} ${response.statusText}`);
          return false;
        }
      }
    } catch (error) {
      console.error('Error fetching meals data:', error);

      return false;
    }
  };

  const getIndTraining = async (toDate: string, fromDate: string): Promise<boolean | undefined> => {
    try {
      const response = await fetch(`/api/proxy/IndividualTrainings/get-by-userId-and-period/${"fbd537f0-8548-47c3-8148-fef9d6a7fe8c"}/${fromDate}/${toDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        if (response.status === 201 || response.status === 200) {
          const data = await response.json();
          setIndTrainings(data);
          return true;
        } else {
          const errorData = await response.json();
          console.log(errorData);
          console.log(`Error: ${response.status} ${response.statusText}`);
          return false;
        }
      }
    } catch (error) {
      console.error('Error fetching meals data:', error);

      return false;
    }
  };


  // const getUser = async (): Promise<boolean | undefined> => {
  //   const email = JSON.parse(localStorage.getItem("currentUser") || "{}").email;
  //   try {
  //     const response = await fetchWithAuth(`/api/proxy/Users/get-by-email/${email}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response) {
  //       console.error("No response received");
  //       return false;
  //     }

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} ${response.statusText}`);
  //     }

  //     if (response.status === 200) {
  //       const data = await response.json();
  //       setUser(data);
  //       if (user?.id) {
  //         console.log(user.id);
  //       } else {
  //         console.error("User ID not found");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     return false;
  //   }
  // };

  const openWeightModal = () => {
    setModalWeightOpen(true);
  };

  const closeWeightModal = () => {
    setModalWeightOpen(false);
    getWeight();
  };

  const openKcalModal = () => {
    setModalKcalOpen(true);
  };

  const closeKcalModal = () => {
    setModalKcalOpen(false);
    const today = new Date();
    getTodayMeals(formatDate(today));
  };

  const refreshTable = () => {

  }

  const handleDateSelect = async (date: dayjs.Dayjs) => {
    console.log("Вибрана дата:", date.format("DD-MM-YYYY"));
    await getIndTraining(formatDate(date.toDate()), formatDate(date.toDate()));
  };

  return (
    <div className={styles.Container}>
      <div className={styles.StatsContainer}>
        <div className={styles.StepsStats}>
          <StatsCard
            title="Кроки"
            value={steps}
            maxValue={15000}
            showProgress={true}
            iconColor="#FAB88C"
            iconSrc="/Stats/directions_walk.svg"
          />
        </div>
        <div className={styles.BasicStats}>
          <StatsCard
            title="Вага"
            value={weight}
            unit="кг"
            iconColor="#E6AD00"
            iconSrc="/Stats/data_usage.svg"
            onClick={handleClick}
          />
        </div>
        <div className={styles.BasicStats}>
          <StatsCard
            title="Kcal"
            value={kcal}
            iconColor="#E6AD00"
            iconSrc="/Stats/meat.svg"
            onClick={handleKcalClick}
          />
        </div>
        <div className={styles.StepsStats}>
          <Stopwatch></Stopwatch>
        </div>
      </div>
      <Tabs
        classNames={{
          cursor: "w-full bg-[#e48100]",
          tabContent: `group-data-[selected=true]:text-[#e48100]  ${styles.tabLabel}`,
          tabList: "pt-[20px] px-[20px]",
        }}
        key="underlined"
        variant="underlined"
        aria-label="FilterTabs"
      >
        <Tab className={styles.Tab} key="GroupTraining" title="Групові"></Tab>
        <Tab
          className={styles.Tab}
          key="PersonalTraining"
          title="Персональні"
        ></Tab>
      </Tabs>
      <div className={styles.NavTableContainer}>
        {/* <div className={styles.Search}>
          <Input
            label="Пошук"
            // isClearable
            radius="md"
            endContent={
              <img src="/search.svg" className={`w-[24px] h-[24px]`} />
            }
          />
        </div> */}
        <div className={styles.Calendar}>
          <Calendar onDateSelect={handleDateSelect} daysToShow={7} />
        </div>
        <Button
          className={styles.Button}
          startContent={<img src="/add.svg" className={`w-[24px] h-[24px]`} />}
          variant="solid"
        >
          Створити
        </Button>
      </div>
      <TableIndTrainings columns={IndividualTrainingColumns} data={indTrainings} refreshTable={refreshTable}></TableIndTrainings>
      <ModalWeightStats isOpen={isModalWeightOpen} onClose={closeWeightModal} ></ModalWeightStats>
      <ModalKcalStats isOpen={isModalKcalOpen} onClose={closeKcalModal} ></ModalKcalStats>
    </div>
  );
};

export default UserHome;
