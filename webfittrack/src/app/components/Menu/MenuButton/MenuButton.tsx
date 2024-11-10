"use client";
import { Noto_Sans } from 'next/font/google';
import type { NextPage } from 'next';
import styles from './MenuButton.module.css';
import Image from 'next/image';


const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
});

interface MenuButtonProps {
  text: string;
  imageSrc: string;
  isActive: boolean; // New prop to indicate if the button is active
  onToggle: () => void; // New prop for the toggle function
}

const MenuButton: NextPage<MenuButtonProps> = ({ text, imageSrc, isActive, onToggle }) => {
  return (
    <div className={`${styles.property1defaultParent} ${notoSans.className}`} onClick={onToggle}>
      {isActive ? (
        <div className={styles.property1default}>
          <div className={styles.property1defaultChild} />
          <div className={styles.property1defaultInner}>
            <div className={styles.userParent}>
              <Image className={styles.userIcon + " " + styles.Svg} alt="user icon" width={24} height={24} src={imageSrc} />
              <div className={styles.div}>{text}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.property1variant2}>
          <div className={styles.property1variant2Child} />
          <div className={styles.property1variant2Inner}>
            <div className={styles.userParent}>
              <Image className={styles.userIcon + " " + styles.Svg} alt="user icon" width={24} height={24} src={imageSrc} />
              <div className={styles.div}>{text}</div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default MenuButton;
