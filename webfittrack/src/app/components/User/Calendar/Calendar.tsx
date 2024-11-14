// components/Calendar.tsx
import { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/uk"; // Імпорт української локалізації
import styles from "./Calendar.module.css"; // Імпорт стилів

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale); // Додаємо плагін updateLocale

// Оновлюємо локалізацію для українських місяців
dayjs.updateLocale("uk", {
  months: [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ],
});

// Встановлюємо українську локалізацію
dayjs.locale("uk");

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

interface CalendarProps {
  onDateSelect: (date: dayjs.Dayjs) => void; // Дія при виборі дати
  daysToShow?: number; // Кількість днів для відображення
}

const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  daysToShow = 7,
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("isoWeek") // Використовуємо isoWeek для початку з понеділка
  );

  const handlePreviousDays = () => {
    setCurrentWeekStart(currentWeekStart.subtract(daysToShow, "day"));
  };

  const handleNextDays = () => {
    setCurrentWeekStart(currentWeekStart.add(daysToShow, "day"));
  };

  const handleDayClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    onDateSelect(date); // Викликаємо функцію зворотного виклику
  };

  const generateWeek = () => {
    const daysInWeek: dayjs.Dayjs[] = [];

    for (let i = 0; i < daysToShow; i++) {
      daysInWeek.push(currentWeekStart.add(i, "day"));
    }

    return daysInWeek;
  };

  const daysInWeek = generateWeek();

  // Отримуємо місяць з обраної дати або, якщо вона не в тижні, з першого дня тижня
  const monthName = daysInWeek.some((date) => date.isSame(selectedDate, "day"))
    ? selectedDate.format("MMMM YYYY") // Якщо обрана дата є в тижні
    : currentWeekStart.format("MMMM YYYY"); // Інакше беремо з початку тижня

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.navigation}>
        <button
          onClick={handlePreviousDays}
          className={styles.navigationButton}
        >
          <img src={"/chevron_left.svg"}></img>
        </button>
        <h2 className={styles.monthTitle}>
          {monthName} {/* Місяць залежно від обраної дати або тижня */}
        </h2>
        <button onClick={handleNextDays} className={styles.navigationButton}>
          <img src={"/chevron_right.svg"}></img>
        </button>
      </div>
      <div className={styles.daysContainer}>
        <div className={styles.daysGrid}>
          {daysInWeek.map((date, index) => (
            <div
              key={index}
              onClick={() => handleDayClick(date)}
              className={`${styles.dayCell} ${date.isSame(selectedDate, "day")
                  ? styles.selectedDay
                  : styles.defaultDay
                }`}
            >
              <div className={styles.dayLabel}>
                {daysOfWeek[date.isoWeekday() - 1]}
              </div>
              <div>{date.date()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
