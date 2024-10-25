"use client";
import React, { useState, useRef } from "react";
import localstyles from "./ConfirmEmailFields.module.css";
import styles from "../UserContent/UserContent.module.css";
import Button from "../Button/Button";

const ConfirmEmailFields: React.FC = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [isFocused, setIsFocused] = useState([false, false, false, false]); // стани для кожного інпуту
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);

    // Фокус на наступне поле, якщо є введення
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    // Якщо код повністю введений, можна виконати подальшу дію, наприклад, верифікацію
    if (newCode.every((val) => val !== "")) {
      console.log("Код введений:", newCode.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Перехід на попереднє поле при натисканні Backspace
    if (e.key === "Backspace" && index > 0 && code[index] === "") {
      const newFocus = [...isFocused];
      newFocus[index] = false; // Деактивуємо поточне поле
      newFocus[index - 1] = true; // Активуємо попереднє поле
      setIsFocused(newFocus);

      inputsRef.current[index - 1]?.focus(); // Фокус на попереднє поле
    }
  };

  const handleFocus = (index: number) => {
    const newFocus = [...isFocused];
    newFocus[index] = true;
    setIsFocused(newFocus);
  };

  const handleBlur = (index: number) => {
    const newFocus = [...isFocused];
    newFocus[index] = false;
    setIsFocused(newFocus);
  };

  return (
    <>
      <div className={styles.UserMain}>
        <div className={styles.FormFields}>
          <div className={localstyles.ConfirmContainer}>
            {code.map((value, index) => (
              <div className={localstyles.inputWrapper} key={index}>
                <input
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => handleFocus(index)}
                  onBlur={() => handleBlur(index)}
                  ref={(el) => (inputsRef.current[index] = el)} // Зберігаємо посилання на інпут
                  className={`${localstyles.input} ${
                    isFocused[index] || value ? localstyles.inputActive : ""
                  }`}
                />
                <label
                  className={`${localstyles.label} ${
                    isFocused[index] || value ? localstyles.labelActive : ""
                  }`}
                >
                  {index + 1}
                </label>
              </div>
            ))}
          </div>
          <div className={styles.Buttons}>
            <Button label="Підтвердити" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmailFields;
