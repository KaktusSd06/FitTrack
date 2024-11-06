import { TableAdminCustomers } from "@/app/components/Table/TableAdminCustomers";
import React from "react";
import { columns } from "@/app/Columns/user.json"

export default function AdminTrainings() {

    return (
        <>
            <TableAdminCustomers columns={columns} />
        </>
    );
}

