import { TableAdminCustomers } from "@/app/components/Table/TableAdminCustomers";
import React from "react";
import { columns } from "@/app/Columns/user.json"

export default function AdminProducts() {

    return (
        <>
            <TableAdminCustomers columns={columns} />
        </>
    );
}

