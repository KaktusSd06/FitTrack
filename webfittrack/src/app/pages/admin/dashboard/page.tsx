import { CustomTable } from "@/app/components/Table/Table";
import React from "react";
import { columns } from "@/app/Columns/user.json"

export default function AdminDashboard() {

    return (
        <>
            <CustomTable columns={columns} />
        </>
    );
}

