import React, { useEffect, useState } from "react";
import styles from "./ViewIndModal.module.css";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    CircularProgress,
} from "@nextui-org/react";
import { fetchWithAuth } from "@/app/fetchWithAuth";

interface AppModalProps {
    trainingId: number;
    isOpen: boolean;
    onClose: () => void;
}

interface Set {
    id: number;
    weight: number; // Вага, яку піднімає користувач
    reps: number; // Кількість повторень в наборі
    exerciseId: number; // Ідентифікатор вправи
    exercise: Exercise | null; // Інформація про вправу
    individualTrainingId: number; // Ідентифікатор індивідуального тренування
    individualTraining: unknown | null;
}

interface Exercise {
    id: number; // Унікальний ідентифікатор вправи
    name: string; // Назва вправи
    description: string; // Опис вправи
    sets: unknown | null; // Набори для цієї вправи
}

const AppModal: React.FC<AppModalProps> = ({ isOpen, onClose, trainingId }) => {
    const [sets, setSets] = useState<Set[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (trainingId) {
            getSetsByTrainingId();
        }
    }, [trainingId]);

    const getSetsByTrainingId = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/proxy/Sets/get-by-individual-training-Id/${trainingId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {
                const data = await response.json();
                const setsWithExercises = await Promise.all(
                    data.map(async (set: Set) => {
                        const exercise = await getExerciseById(set.exerciseId);
                        return { ...set, exercise }; // Додаємо інформацію про вправу до кожного сету
                    })
                );
                setSets(setsWithExercises);
            }
        } catch (error) {
            console.error('Error fetching sets:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getExerciseById = async (exerciseId: number): Promise<Exercise | null> => {
        try {
            const response = await fetch(`/api/proxy/Exercises/${exerciseId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Error fetching exercise:', error);
            return null;
        }
    };

    return (
        <Modal
            classNames={{
                base: "h-screen"
            }}
            isOpen={isOpen}
            onOpenChange={(newState) => {
                if (!newState) onClose();
            }}
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Перегляд тренування</ModalHeader>
                <ModalBody>
                    {isLoading ? (
                        <div className={styles.LoadingContainer}>
                            <CircularProgress size="lg" classNames={{ base: "w-full", indicator: "stroke-[--fulvous]" }} />
                        </div>
                    ) : (
                        <div className={styles.containerWrapper}>
                            <div className={styles.TopContent}>
                                {/* Вивести сети та вправи */}
                                {sets.map((set) => (
                                    <div key={set.id}>
                                        <h3>Сет {set.id}</h3>
                                        <p>Вага: {set.weight} кг</p>
                                        <p>Повторення: {set.reps}</p>
                                        {set.exercise ? (
                                            <div>
                                                <h4>{set.exercise.name}</h4>
                                                <p>{set.exercise.description}</p>
                                            </div>
                                        ) : (
                                            <p>Інформація про вправу не знайдена</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AppModal;
