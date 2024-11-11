import styles from "./StatsCard.module.css";
import { Progress } from "@nextui-org/react";

type StatsCardProps = {
  title?: string;
  value?: number;
  maxValue?: number;
  unit?: string;
  iconColor?: string;
  iconSrc?: string;
  onClick?: () => void;
  showProgress?: boolean;
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  maxValue,
  unit,
  iconColor,
  iconSrc,
  onClick,
  showProgress = false,
}) => {
  return (
    <div
      className={`${styles.Card} ${showProgress ? styles.StepsCard : ""}`}
      onClick={onClick}
    >
      <div className={styles.Content}>
        <p className={`${styles.Title}  ${value ? "text-[12px]" : "text-[16px]"}`}>{title}</p>
        {
          value && <div className={styles.StatsValue}>
            <div className={styles.Value}>
              <span className={styles.CurrentValue}>
                {value}
                {unit && ` ${unit}`}
              </span>
              {showProgress && maxValue && (
                <span className={styles.Goal}>
                  /{maxValue}
                  {unit}
                </span>
              )}
            </div>
            {showProgress && maxValue && (
              <div className={styles.Progress}>
                <Progress
                  classNames={{
                    indicator: "bg-fulvous",
                    track: "bg-gray",
                  }}
                  size="md"
                  value={value}
                  maxValue={maxValue}
                />
              </div>
            )}
          </div>
        }
      </div>
      {iconSrc &&
        <div className={styles.Icon} style={{ position: "relative" }}>
          <div
            className={styles.IconBefore}
            style={{
              backgroundColor: iconColor,
            }}
          />
          {iconSrc && <img src={iconSrc} alt="icon" />}
        </div>
      }
    </div>
  );
};

export default StatsCard;
