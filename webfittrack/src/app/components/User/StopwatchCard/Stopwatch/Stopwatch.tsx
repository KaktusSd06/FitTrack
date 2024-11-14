import React, { useState, useEffect, useRef } from 'react';
import styles from './Stopwatch.module.css';
import { DateValue } from "@internationalized/date";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // час у мілісекундах
  const [stopTimeInSeconds, setStopTimeInSeconds] = useState(0); // зберігаємо час зупинки в секундах
  const [currentTimeInSecond, setCurrentTimeInSeconds] = useState(0); // зберігаємо час зупинки в секундах
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [userId, setUserId] = useState("");
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(0);

  const handleIconClick = () => {
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("currentUser") || "{}").userId;
    setUserId(id);
    console.log("User ID set:", id); // Логування ID користувача
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("Fetching training time for user:", userId);
      getTrainingTimeWeek();
    }
  }, [userId]);


  const postTrainingTime = async (trainingTimeData: Record<string, unknown>): Promise<boolean | undefined> => {
    try {
      const response = await fetch(`/api/proxy/TrainingTime`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainingTimeData),
      });

      if (response.status === 201) {
        return true;
      } else {
        console.log(response.json());
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getStartOfWeek = (date: Date) => {
    const day = date.getDay() || 7;
    if (day !== 1) {
      date.setHours(-24 * (day - 1));
    }
    date.setMinutes(0, 0, 0);
    return date;
  };

  const getEndOfWeek = (date: Date) => {
    date.setHours(23, 59, 59, 999);
    return date;
  };

  const getCurrentWeekDateRange = () => {
    const today = new Date();
    const startOfWeek = getStartOfWeek(new Date(today));
    const endOfWeek = getEndOfWeek(new Date(today));

    const fromDate = formatDate(startOfWeek);
    const toDate = formatDate(endOfWeek);

    console.log("Current week range:", fromDate, toDate); // Логування діапазону дат
    return { fromDate, toDate };
  };

  const getTrainingTimeWeek = async (): Promise<boolean | undefined> => {
    try {
      const { fromDate, toDate } = getCurrentWeekDateRange();
      setFromDate(fromDate);
      setToDate(toDate);

      console.log("Requesting data from API...");
      const response = await fetch(`/api/proxy/TrainingTime/get-by-userId-and-period/${userId}/${fromDate}/${toDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const totalDurationInSeconds = await response.json(); // Отримуємо кількість секунд
      console.log("Total duration in seconds from API:", totalDurationInSeconds); // Логування кількості секунд
      setCurrentTimeInSeconds(totalDurationInSeconds);
      setElapsedTime(totalDurationInSeconds * 1000); // Переводимо в мілісекунди
      return true;

    } catch (error) {
      console.error('Error fetching user data:', error);
      return false;
    }
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalIdRef.current = setInterval(() => {
        const currentElapsedTime = Date.now() - startTimeRef.current;
        setElapsedTime(currentElapsedTime);
      }, 10);
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        setStopTimeInSeconds(elapsedTime / 1000);
        console.log("Stopwatch paused at (seconds):", elapsedTime / 1000); // Логування часу в секундах при паузі
      }
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning, elapsedTime]);

  useEffect(() => {
    if (stopTimeInSeconds != 0) {
      const duration = Math.floor(stopTimeInSeconds - currentTimeInSecond);
      console.log(duration);
      const trainingTimeData = {
        durationInSeconds: duration,
        date: formatDate(new Date()),
        userId: userId
      }

      if (duration > 0) {
        postTrainingTime(trainingTimeData);
      }
    };
  }, [stopTimeInSeconds]);




  const formatTime = () => {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);

    const pad = (num: number) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div className={`${styles.Card} ${true ? styles.StepsCard : ""}`}>
      <div className={styles.Content}>
        <p className={styles.Title}>Тренувань на цьому тижні</p>
        <div className={styles.StatsValue}>
          <div className={styles.Value}>
            <span className={styles.CurrentValue}>
              {formatTime()} {/* Виведення часу секундоміра */}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.Icon} style={{ position: "relative" }} onClick={handleIconClick}>
        <div className={styles.IconBefore} style={{
          backgroundColor: '#E6AD00',
        }}></div>
        <img
          src={isRunning ? "/pause_circle_outline.svg" : "/play_circle_outline.svg"}
          alt={isRunning ? "Pause" : "Play"}
        />
      </div>
    </div>
  );
};

export default Stopwatch;
