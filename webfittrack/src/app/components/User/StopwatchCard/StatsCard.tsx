import styles from "./StatsCard.module.css";
import { Progress } from "@nextui-org/react";


const StatsCard = ({
}) => {
  return (
    <div
      className={`${styles.Card} ${true ? styles.StepsCard : ""}`}
    >
      <div className={styles.Content}>
        <p className={styles.Title}>Тренувань на цьому тижні</p>
        <div className={styles.StatsValue}>
          <div className={styles.Value}>
            <span className={styles.CurrentValue}>

            </span>
          </div>
        </div>
      </div>
      <div className={styles.Icon} style={{ position: "relative" }}>
        <div
          className={styles.IconBefore}
        // style={{
        //   backgroundColor: iconColor,
        // }}
        />
        <img src="/" alt="icon" />
      </div>
    </div>
  );
};

export default StatsCard;
