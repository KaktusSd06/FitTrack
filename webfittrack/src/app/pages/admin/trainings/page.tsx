<<<<<<< HEAD
import { CustomTable } from "@/app/components/Table/Table";
=======
import { TableAdminCustomers } from "@/app/components/Table/TableOwnerGyms";
>>>>>>> 5b36690 (addded ability for creating trainers)
import React from "react";
import { columns } from "@/app/Columns/user.json"

export default function AdminTrainings() {

    return (
        <>
            <CustomTable columns={columns} />
        </>
    );
}

