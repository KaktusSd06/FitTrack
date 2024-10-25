import React, { useState } from "react";
import Image from "next/image";
import styles from "./Field.module.css";

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ label, type, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Стан для показу/приховування пароля

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev); // Змінюємо стан
  };

  return (
    <div className={styles.fieldContainer}>
      <input
        type={showPassword && type === "password" ? "text" : type} // Змінюємо тип поля
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${styles.inputField} ${
          isFocused || value ? styles.inputFieldActive : ""
        }`}
      />
      <label
        className={`${styles.label} ${
          isFocused || value ? styles.labelActive : ""
        }`}
      >
        {label}
      </label>

      {type === "password" && (
        <div
          className={`${styles.togglePassword} ${
            isFocused || value ? styles.iconActive : styles.iconInactive
          }`}
          onClick={toggleShowPassword}
        >
          <Image
            src={
              showPassword
                ? "/AuthPage/visibility_off.svg"
                : "/AuthPage/visibility.svg"
            }
            alt={showPassword ? "🙈" : "👁️"}
            width={24}
            height={24}
          />
        </div>
      )}
    </div>
  );
};

export default Field;
