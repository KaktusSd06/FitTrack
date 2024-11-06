"use client";

import styles from "./UserHome.module.css";
import StatsCard from "../../StatsCard/StatsCard";
import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import Calendar from "../Calendar/Calendar";
import dayjs from "dayjs";
import { CustomTable } from "../../Table/TableAdminCustomers";
import data from "@/app/components/Table/data.json";

const UserHome = () => {
  const handleClick = () => {
    console.log("Card clicked");
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
