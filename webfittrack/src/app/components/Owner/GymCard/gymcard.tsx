"use client";

import styles from "./gymcard.module.css";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

interface GymCardProps {
    gymName: string;
    address: string;
    id: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const GymCard: React.FC<GymCardProps> = ({ gymName, address, id, onEdit, onDelete }) => {
    return (
        <div className={styles.Card}>
            <div className={styles.CardBody}>
                <div className={styles.CardContent}>
                    <div className={styles.CardInfo}>
                        <p className={styles.GymName}>{gymName}</p>
                        <p className={styles.Adress}>{address}</p>
                    </div>
                    <Dropdown>
                        <DropdownTrigger>
                            <img className={styles.DropdownTrigger} src="/more_vert.svg" alt="More options" />
                        </DropdownTrigger>
                        <DropdownMenu variant="solid" aria-label="Dropdown menu with icons">
                            <DropdownItem
                                key="edit"
                                // startContent={<img className={styles.ItemIcon} src="/edit.svg" alt="Edit" />}
                                onClick={() => onEdit(id)}
                            >
                                Редагувати
                            </DropdownItem>
                            <DropdownItem
                                className={`${styles.customColor} ${styles.deleteItem}`}
                                key="delete"
                                // startContent={<img className={styles.ItemIcon} src="/delete-outline.svg" alt="Delete" />}
                                onClick={() => onDelete(id)}
                            >
                                Видалити
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default GymCard;
