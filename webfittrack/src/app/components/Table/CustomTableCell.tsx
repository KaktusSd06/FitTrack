import React from "react";
import { Tooltip, Avatar } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import CameraIcon from "./CameraIcon";
import { Admin, GroupTraining, Gym, Membership, Service, Trainer, User } from "@/app/Interfaces/Interfaces";
import { useEffect, useState } from "react";

interface UserTableCellProps<T> {
    obj: T;
    columnKey: React.Key;
    onEdit?: (obj: T) => void;
    onDelete?: (obj: T) => void;
}

const CustomTableCell = <T extends User | Trainer | Admin | Gym | Service | Membership | GroupTraining>({
    obj,
    columnKey,
    onEdit,
    onDelete,
}: UserTableCellProps<T>): JSX.Element => {
    const cellValue = obj[columnKey as keyof T];
    const [trainerName, setTrainerName] = useState<string>("");

    useEffect(() => {
        if (columnKey === "trainerId" && cellValue) {
            const fetchData = async (): Promise<void> => {
                const response = await fetch(`/api/proxy/Trainers/get-by-id/${cellValue}`);
                const trainer: Trainer = await response.json();
                setTrainerName(trainer.lastName + ' ' + trainer.firstName); // Update state with the trainer's name
            };

            fetchData(); // Fetch data when columnKey is "trainerId"
        }
    }, [columnKey, cellValue]);
    switch (columnKey) {
        case "trainerId":

            return (
                <div className="flex items-center gap-2">
                    {trainerName}
                </div>
            );

        case "profilePicture":
            return (
                <Avatar
                    showFallback
                    src="https://images.unsplash.com/broken"
                    fallback={
                        <CameraIcon
                            className="animate-pulse w-6 h-6 text-default-500"
                            fill="currentColor"
                            size={20}
                        />
                    }
                />
            );

        case "gym":
            return (
                <div className="flex items-center gap-2">
                    {cellValue && typeof cellValue === "object" && "name" in cellValue
                        ? (cellValue as { name: string }).name
                        : "N/A"}
                </div>
            );

        case "actions":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Редагувати">
                        <span onClick={() => onEdit?.(obj)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Видалити">
                        <span onClick={() => onDelete?.(obj)} className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
            );

        default:
            return (
                <div>
                    {
                        cellValue && typeof cellValue === "object" ? (
                            "firstName" in cellValue ? (
                                (cellValue as { firstName: string }).firstName
                            ) : "name" in cellValue ? (
                                (cellValue as { name: string }).name
                            ) : null
                        ) : typeof cellValue === "string" || typeof cellValue === "number" ? (
                            cellValue
                        ) : null
                    }
                </div>
            );
    }
};

export default CustomTableCell;
