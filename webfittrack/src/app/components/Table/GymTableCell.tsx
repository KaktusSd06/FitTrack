import React from "react";
import { Tooltip } from "@nextui-org/react";
import { Gym } from "@/app/Interfaces/Interfaces";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";


interface GymTableCellProps {
    gym: Gym;
    onEdit?: (gym: Gym) => void;
    onDelete?: (gym: Gym) => void;
    columnKey: React.Key;
}
const GymTableCell = ({
    gym,
    columnKey,
    onEdit,
    onDelete,
}: GymTableCellProps): JSX.Element => {
    const cellValue = gym[columnKey as keyof Gym];

    switch (columnKey) {
        case "actions":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit" placement="left">
                        <span onClick={() => onEdit?.(gym)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete" placement="right">
                        <span onClick={() => onDelete?.(gym)} className="text-lg text-danger cursor-pointer active:opacity-50">
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

export default GymTableCell;
