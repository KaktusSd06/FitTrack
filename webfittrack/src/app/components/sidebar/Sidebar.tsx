"use client";
import styles from './Sidebar.module.css';
import MenuButton1 from '../Menu/MenuButton/MenuButton1';
interface ButtonData {
  text: string;
  imageSrc: string;
  redirectPath: string;
}


interface SidebarProps {
  buttonsData: ButtonData[];
}

const Sidebar: React.FC<SidebarProps> = ({ buttonsData }) => {


  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <img className={styles.frameChild} alt="" src="/images/logoicon.svg" />
        <div className={styles.fittrack}>FitTrack</div>
      </div>

      <div style={{ width: '400px', height: '360px', display: 'flex', flexDirection: 'column' }}>
        {buttonsData.map((button, index) => (
          <MenuButton1
            key={index}
            text={button.text}
            imageSrc={button.imageSrc}
            path={button.redirectPath}
          />
        ))}
      </div>

    </div>);
};


export default Sidebar;