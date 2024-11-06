"use client";

import styles from "./Gyms.module.css";
import GymCard from "./GymCard/gymcard";
import { Input, Button } from "@nextui-org/react"

const Gyms: React.FC = () => {
    const getGyms = async () => {
        try {
            const response = await fetch(`/api/proxy/Gyms/${ownerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.status === 201;

        } catch (error) {
            console.error('Error registering user:', error);
            return false;
        }
    }


    return (
        <div className={styles.Container}>
            <div className={styles.TopContainer}>
                <div className={styles.Search}>
                    <Input
                        label="Пошук"
                        // isClearable
                        radius="md"
                        endContent={
                            <img src="/search.svg" className={`w-[24px] h-[24px]`} />
                        }
                    />
                </div>
                <Button
                    className={styles.Button}
                    startContent={<img src="/add.svg" className={`w-[24px] h-[24px]`} />}
                    variant="solid"
                >
                    Створити
                </Button>
            </div>
            <div className={styles.GymsContainer}>
                <GymCard
                    image="/rounded-rectangle.png"
                    gymName="Назва залу"
                    address="м. Хмельницький пр. Миру 134"
                    id="gym1"
                    onEdit={(id) => console.log(`Edit gym with id: ${id}`)}
                    onDelete={(id) => console.log(`Delete gym with id: ${id}`)}
                />
                <GymCard
                    image="/rounded-rectangle.png"
                    gymName="Назва залу"
                    address="м. Хмельницький пр. Миру 134"
                    id="gym1"
                    onEdit={(id) => console.log(`Edit gym with id: ${id}`)}
                    onDelete={(id) => console.log(`Delete gym with id: ${id}`)}
                />
                <GymCard
                    image="/rounded-rectangle.png"
                    gymName="Назва залу"
                    address="м. Хмельницький пр. Миру 134"
                    id="gym1"
                    onEdit={(id) => console.log(`Edit gym with id: ${id}`)}
                    onDelete={(id) => console.log(`Delete gym with id: ${id}`)}
                />
                <GymCard
                    image="/rounded-rectangle.png"
                    gymName="Назва залу"
                    address="м. Хмельницький пр. Миру 134"
                    id="gym1"
                    onEdit={(id) => console.log(`Edit gym with id: ${id}`)}
                    onDelete={(id) => console.log(`Delete gym with id: ${id}`)}
                />
                <GymCard
                    image="/rounded-rectangle.png"
                    gymName="Назва залу"
                    address="м. Хмельницький пр. Миру 134"
                    id="gym1"
                    onEdit={(id) => console.log(`Edit gym with id: ${id}`)}
                    onDelete={(id) => console.log(`Delete gym with id: ${id}`)}
                />
            </div>
        </div>
    )
}

export default Gyms;
