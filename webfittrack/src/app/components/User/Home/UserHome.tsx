"use client";

import styles from "./UserHome.module.css";
import StatsCard from "../../StatsCard/StatsCard";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import Calendar from "../Calendar/Calendar";
import dayjs from "dayjs";
import { CustomTable } from "../../Table/Table";
import data from "@/app/components/Table/data.json";
import { useEffect } from "react";
import { fetchWithAuth } from "@/app/fetchWithAuth";
import { useRouter } from "next/router";

const UserHome = () => {
  const handleClick = () => {
    console.log("Card clicked");
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (): Promise<boolean | undefined> => {
    const email = JSON.parse(localStorage.getItem("currentUser") || "{}").email;
    try {
      const response = await fetchWithAuth(`/api/proxy/Admins/get-by-email/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Перевіряємо, чи є response перед подальшою обробкою
      if (!response) {
        console.error("No response received");
        return false; // Якщо response undefined, припиняємо виконання
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.id);
        window.location.href = "/pages/Login";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return false;
    }
  };


  const handleDateSelect = (date: dayjs.Dayjs) => {
    console.log("Вибрана дата:", date.format("DD-MM-YYYY"));
  };
  return (
    <div className={styles.Container}>
      <div className={styles.StatsContainer}>
        <div className={styles.StepsStats}>
          <StatsCard
            title="Кроки"
            value={10000}
            maxValue={15000}
            showProgress={true}
            iconColor="#FAB88C"
            iconSrc="/Stats/directions_walk.svg"
            onClick={handleClick}
          />
        </div>
        <div className={styles.BasicStats}>
          <StatsCard
            title="Вага"
            value={87.3}
            unit="кг"
            iconColor="#E6AD00"
            iconSrc="/Stats/data_usage.svg"
            onClick={handleClick}
          />
        </div>
        <div className={styles.BasicStats}>
          <StatsCard
            title="Kcal"
            value={600}
            iconColor="#E6AD00"
            iconSrc="/Stats/meat.svg"
            onClick={handleClick}
          />
        </div>
        <div className={styles.BasicStats}>
          <StatsCard
            title="Час тренувань на цьому тижні"
            value={228}
            unit="хв"
            iconColor="#1CEC42"
            iconSrc="/Stats/access_time.svg"
            onClick={handleClick}
          />
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
      <CustomTable {...data} />
    </div>
  );
};

export default UserHome;
