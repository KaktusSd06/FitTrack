"use client";
import { useState } from "react";
import { Noto_Sans } from "next/font/google";
import type { NextPage } from "next";
import MenuButton from "../MenuButton/MenuButton";

const notoSans = Noto_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

interface ButtonData {
  text: string;
  imageSrc: string;
  func: () => void;
}

interface MenuButtonGroupProps {
  buttonsData: ButtonData[];
}

const MenuButtonGroup: NextPage<MenuButtonGroupProps> = ({ buttonsData }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      buttonsData[index].func();
    }
  };

  return (
    <div
      className={notoSans.className + "layoutContainer"}
      style={{
        width: "400px",
        height: "360px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {buttonsData.map((button, index) => (
        <MenuButton
          key={index}
          text={button.text}
          imageSrc={button.imageSrc}
          isActive={activeIndex === index} // Pass down the active state
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default MenuButtonGroup;
