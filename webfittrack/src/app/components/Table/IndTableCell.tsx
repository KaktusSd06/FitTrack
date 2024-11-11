import React from "react";
import { Tooltip } from "@nextui-org/react";
import { IndTraining } from "../User/IndTraining";  // Імпортуємо інтерфейс IndTraining
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";

interface IndTrainingTableCellProps {
    training: IndTraining;  // Заміна типу Gym на IndTraining
    onView?: (training: IndTraining) => void;
    onDelete?: (training: IndTraining) => void;
    columnKey: React.Key;
}

const IndTrainingTableCell = ({
    training,
    columnKey,
    onView,
    onDelete,
}: IndTrainingTableCellProps): JSX.Element => {
    const cellValue = training[columnKey as keyof IndTraining];  // Заміна gym на training

    switch (columnKey) {
        case "actions":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="View" placement="left">
                        <span onClick={() => onView?.(training)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete" placement="right">
                        <span onClick={() => onDelete?.(training)} className="text-lg text-danger cursor-pointer active:opacity-50">
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

export default IndTrainingTableCell;
