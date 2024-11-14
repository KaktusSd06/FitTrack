import React from "react";
import { Tooltip } from "@nextui-org/react";
import { Admin } from "@/app/Interfaces/Interfaces";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";


interface AdminTableCellProps {
    admin: Admin;
    onEdit?: (admin: Admin) => void;
    onDelete?: (gym: Admin) => void;
    columnKey: React.Key;
}
const AdminTableCell = ({
    admin,
    columnKey,
    onEdit,
    onDelete,
}: AdminTableCellProps): JSX.Element => {
    const cellValue = admin[columnKey as keyof Admin];

    switch (columnKey) {
        case "actions":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit" placement="left">
                        <span onClick={() => onEdit?.(admin)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete" placement="right">
                        <span onClick={() => onDelete?.(admin)} className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
            );

        default:
            return (
                <div>
                    {typeof cellValue === "string" || typeof cellValue === "number"
                        ? cellValue
                        : "N/A"}
                </div>
            );
    }
};

export default AdminTableCell;
