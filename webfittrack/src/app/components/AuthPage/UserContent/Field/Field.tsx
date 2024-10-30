import React, { useState } from "react";
import styles from "./Field.module.css";

interface FieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ label, type, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.fieldContainer}>
      <input
        type={type}
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
    </div>
  );
};

export default Field;
