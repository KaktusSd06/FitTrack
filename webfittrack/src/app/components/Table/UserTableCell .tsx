import React from "react";
import { Tooltip, Avatar } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import CameraIcon from "./CameraIcon";
import { Admin, Trainer, User } from "@/app/Interfaces/Interfaces";

interface UserTableCellProps<T> {
    user: T;
    columnKey: React.Key;
    onEdit?: (user: T) => void;
    onDelete?: (user: T) => void;
}

const UserTableCell = <T extends User | Trainer | Admin>({
    user,
    columnKey,
    onEdit,
    onDelete,
}: UserTableCellProps<T>): JSX.Element => {
    const cellValue = user[columnKey as keyof T];

    switch (columnKey) {
        case "trainer":
            return (
                <div className="flex items-center gap-2">
                    {cellValue && typeof cellValue === "object" && "firstName" in cellValue
                        ? (cellValue as { firstName: string }).firstName
                        : "N/A"}
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
                    <Tooltip content="Edit user">
                        <span onClick={() => onEdit?.(user)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                        <span onClick={() => onDelete?.(user)} className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
            );

        default:
            return (
                <div>
                    {cellValue && typeof cellValue === "object" && "firstName" in cellValue
                        ? (cellValue as { firstName: string }).firstName
                        : typeof cellValue === "string" || typeof cellValue === "number"
                            ? cellValue
                            : "N/A"}
                </div>
            );
    }
};

export default UserTableCell;
