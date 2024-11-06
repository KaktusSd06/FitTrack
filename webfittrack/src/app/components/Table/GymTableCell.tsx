import React from "react";
import { Tooltip, Avatar } from "@nextui-org/react";
import { User } from "@/app/Interfaces/Interfaces";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import CameraIcon from "./CameraIcon";

interface UserTableCellProps {
    user: User;
    columnKey: React.Key;
}
const UserTableCell: React.FC<UserTableCellProps> = ({ user, columnKey }) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
        case "trainer":
            return (
                <div className="flex items-center gap-2">
                    {cellValue && typeof cellValue === "object" && "firstName" in cellValue
                        ? cellValue.firstName
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
                        ? cellValue.name
                        : "N/A"}
                </div>
            );

        case "actions":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
            );

        default:
            return (
                <div>
                    {cellValue && typeof cellValue === "object" && "firstName" in cellValue
                        ? cellValue.firstName
                        : typeof cellValue === "string" || typeof cellValue === "number"
                            ? cellValue
                            : "N/A"}
                </div>
            );
    }
};

export default UserTableCell;
