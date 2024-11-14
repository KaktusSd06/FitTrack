import React from "react";
import styles from "./RightSidebar.module.css";

// Типи пропсів для компонента RightSidebar
interface RightSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
    return (
        <div>
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <div className={styles.sidebarHeader}>
                    <button onClick={onClose} className={styles.closeButton}>Close Sidebar</button>
                </div>
                <div className={styles.sidebarContent}>

                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
