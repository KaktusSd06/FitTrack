import React from "react";
import { GymColumns } from "@/app/Api/gym/gym.json"
import { TableOwnerGyms } from "@/app/components/Table/TableOwnerGyms";

export default function AdminTrainings() {

    return (
        <>
            <TableOwnerGyms columns={GymColumns} data={[]}></TableOwnerGyms>
        </>
    );
}

