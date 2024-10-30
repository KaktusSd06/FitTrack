"use client";
import React from "react";
import styles from './Sidebar.module.css';
import MenuButtonGroup from "../Menu/MenuButtonGroup/MenuButtonGroup";


const Sidebar = () => {
    const buttonsData = [
        {
          text: "Користувачі",
          imageSrc: "/images/user.svg",
          func: () => {
            console.log("clicked 1");
          },
        },
        {
          text: "Товари",
          imageSrc: "/images/local-grocery-store.svg",
          func: () => {
            console.log("clicked 2");
          },
        },
        {
          text: "Панель",
          imageSrc: "/images/icon-color.png",
          func: () => {
            console.log("clicked 3");
          },
        },
        {
          text: "Тренування",
          imageSrc: "/images/mdi-dumbbell.svg",
          func: () => {
            console.log("clicked 4");
          },
        },
        {
          text: "Транзакції",
          imageSrc: "/images/attach-money.svg",
          func: () => {
            console.log("clicked 5");
          },
        },
      ];
  	return (
    		<div className={styles.frameParent}>
      			<div className={styles.frameGroup}>
        				<img className={styles.frameChild} alt="" src="/images/logoicon.svg" />
        				<div className={styles.fittrack}>FitTrack</div>
      			</div>
                  <MenuButtonGroup buttonsData={buttonsData}  />
      			
    		</div>);
};


export default Sidebar;